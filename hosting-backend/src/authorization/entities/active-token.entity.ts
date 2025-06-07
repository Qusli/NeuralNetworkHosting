import { Account } from "src/accounts/entities/account.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("active_tokens")
export class ActiveToken {
    @PrimaryColumn()
    jti: string

    @ManyToOne(() => Account)
    @JoinColumn({ name: "account_id" })
    account: Account

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date
}