import { BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { hashPassword } from "../utils/hash-password.utils";

@Entity("accounts")
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column({ type: "text", unique: true })
    email: string

    @Column({ type: "text" })
    password: string

    @BeforeInsert()
    async insertHashPassword() {
        this.password = await hashPassword(this.password)
    }

    @BeforeUpdate()
    async updateHashPassword() {
        this.password = await hashPassword(this.password)
    }
}