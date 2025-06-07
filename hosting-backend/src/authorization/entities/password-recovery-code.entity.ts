import { Account } from "src/accounts/entities/account.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("password_recovery_codes")
export class PasswordRecoveryCode {
    @PrimaryColumn()
    code: number

    @Column({ type: "boolean", default: false })
    confirm: boolean

    @ManyToOne(() => Account)
    @JoinColumn({ name: "account_id" })
    account: Account

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date
}