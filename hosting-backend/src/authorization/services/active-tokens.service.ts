import * as dayjs from "dayjs"
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActiveToken } from "../entities/active-token.entity";
import { Repository } from "typeorm";
import { CreateActiveTokenDto } from "../dto/create-revoked-token.dto";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ActiveTokensService {
    private readonly logger = new Logger(ActiveTokensService.name)

    constructor(
        @InjectRepository(ActiveToken) private readonly rep: Repository<ActiveToken>,
        private readonly config: ConfigService,
    ) {}

    async existsByJti(jti: string): Promise<boolean> {
        return this.rep.existsBy({ jti })
    }

    async create(dto: CreateActiveTokenDto): Promise<number> {
        const revokedToken = this.rep.create(dto)

        const result = await this.rep.insert(revokedToken)

        return result.identifiers[0].id
    }

    async delete(jti: string): Promise<void> {
        this.rep.delete(jti)
    }

    async deleteAllByAccounId(accountId: number): Promise<void> {
        this.rep.delete({ 
            account: { id: accountId }  
        })
    }

    @Cron(CronExpression.EVERY_WEEK)
    private async clearExpiredTokens() {
        const date = dayjs().subtract(this.config.get("jwt.expiresTime"), 'd').toDate()

        const qb = await this.rep.createQueryBuilder()
        .delete()
        .where("revoked_tokens.created_at < :date", { date })
        .execute()

        this.logger.log("Revoked tokens clear", qb.affected.toString())
    }
}