import { Account } from "src/accounts/entities/account.entity";
import { UserPermission } from "src/permissions/entities/user-permission";
import { Role } from "src/roles/entities/role.entity";
import { Workplace } from "src/workplaces/entities/workplace.entiy";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 40, nullable: true })
    lastname: string

    @Column({ type: "varchar", length: 30, nullable: true })
    firstname: string

    @Column({ type: "varchar", length: 40, nullable: true })
    surname: string

    @ManyToOne(() => Role)
    @JoinColumn({ name: "role_id" })
    role: Role

    @ManyToOne(() => Workplace, (workplace) => workplace.users, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "workplace_id" })
    workplace: Workplace

    @ManyToOne(() => Account, { nullable: false })
    @JoinColumn({ name: "account_id" })
    account: Account

    @OneToMany(() => UserPermission, (permission) => permission.user, { nullable: false, onDelete: "CASCADE" })
    permissions: UserPermission[]
}