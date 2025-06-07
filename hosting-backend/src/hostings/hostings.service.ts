import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHostingDto } from './dto/create-hosting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hosting } from './entities/hosting.entity';
import { Repository } from 'typeorm';
import { NNHHostingsApi } from 'api/hostings/api';
import { ConnectToHostDto } from 'api/hostings/dto/connect-to-host.dto';
import { EHostingStatus } from './enums/hosting-status.enum';

@Injectable()
export class HostingsService {
  constructor(@InjectRepository(Hosting) private readonly rep: Repository<Hosting>) {}

  async findByWorkplaceId(workplaceId: number) {
    return this.rep.findBy({ workplace: { id: workplaceId } });
  }

  async findOneById(hostingId: number, workplaceId: number) {
    
    // Синхронизируем хостинг, перед тем, как его отдать
    await this.syncHosting(hostingId, workplaceId)

    return this.rep.findOneBy({ id: hostingId, workplace: { id: workplaceId } });
  }

  async create(dto: CreateHostingDto) {
    const entity = this.rep.create(dto);

    const connectToHostDto: ConnectToHostDto = {
      address: dto.host,
      port: dto.port,
      description: dto.description
    }

    const [hosting, error] = await NNHHostingsApi.connectToHost(connectToHostDto)

    if (!hosting || error) {
      throw new HttpException(error?.message || "Unknow error", error?.status || HttpStatus.BAD_REQUEST)
    }    

    entity.id = hosting.id
    entity.hostType = hosting.hostType
    entity.status = hosting.status
    entity.workplace.id = dto.workplace.id

    return this.rep.save(entity)
  }

  async syncHosting(hostingId: number, workplaceId: number): Promise<void> {
    const _hosting = await this.rep.findOneBy({ id: hostingId, workplace: { id: workplaceId } })

    if (!_hosting) {
      throw new HttpException("Hosting not found", HttpStatus.BAD_REQUEST)
    }

    const [hosting, error] = await NNHHostingsApi.getHostingById(hostingId)

    // TODO: Заменить на переподключение
    if (!hosting && !error) {
      await this.rep.delete(_hosting.id)
      return;
    }

    if (hosting) {
      await this.rep.update(_hosting.id, {
        host: hosting.address,
        port: hosting.port,
        description: hosting.description,
        hostType: hosting.hostType,
        status: hosting.status,
      })
    } else if (hosting.status !== 4) {
      await this.rep.update(_hosting.id, {
        status: EHostingStatus.EXITED // exited
      })
    }
  }

}
