import { Account } from "src/accounts/entities/account.entity";
import { Role } from "src/roles/entities/role.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("workplaces")
export class Workplace {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    title: string

    @OneToMany(() => Role, (role) => role.workplace, { nullable: false })
    roles: Role[]

    @OneToMany(() => User, (user) => user.workplace, { nullable: false })
    users: User[]

    @ManyToOne(() => Account, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "owner_id" })
    owner: Account
}