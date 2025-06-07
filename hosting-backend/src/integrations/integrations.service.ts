import { CreateIntegrationContainerDto } from './dto/create-intergration-container.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Integration } from "./entities/integration.entity";
import { Repository } from "typeorm";
import { CreateIntegrationDto } from "./dto/create-integration.dto";
import { IntegrationContainer } from './entities/integration-container.entity';

@Injectable()
export class integrationsService {
    private runnedIntegrations: { [key: string]: string[] }[] = []

    constructor(
        @InjectRepository(Integration) private readonly repIntegration: Repository<Integration>,
        @InjectRepository(IntegrationContainer) private readonly repIntegrationContainer: Repository<IntegrationContainer>
    ) {}

    async create(createIntegrationDto: CreateIntegrationDto, createIntegrationContainerDtos: CreateIntegrationContainerDto[]): Promise<string> {
        const createIntegrationContainerEntities = []

        for (const dto of createIntegrationContainerDtos) {
            createIntegrationContainerEntities.push(this.repIntegrationContainer.create(dto))
        }

        if (!createIntegrationContainerDtos.length) {
            throw new HttpException("Integration containers is empty", HttpStatus.BAD_REQUEST)
        }

        const createIntegrationEntity = this.repIntegration.create(createIntegrationDto)
        
        const integration = await this.repIntegration.save(createIntegrationEntity)

        if (integration.uuid) {
            for (let i = 0; i < createIntegrationContainerEntities.length; ++i) {
                createIntegrationContainerEntities[i].integration = integration
            }

            await this.repIntegrationContainer.insert(createIntegrationContainerEntities)
        }

        return integration.uuid
    }

    async postData(uuid: string, dto: any) {
        const integrationContainers = await this.repIntegrationContainer.find({
            where: {
                integration: {
                    uuid
                }
            }
        })

        if (!integrationContainers.length) {
            throw new HttpException("Integrations containers is empty", HttpStatus.BAD_REQUEST)
        }

        for (const container of integrationContainers) {
            const key = uuid + "_" + container.containerUuid
            
            if (!this.runnedIntegrations[key]?.length) {
                
                // TODO: Доделать
                
                this.runnedIntegrations[key] = [key] 
                break;
            } 
        }
    }
}  