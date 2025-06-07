import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Workplace } from "src/workplaces/entities/workplace.entiy";
import { RolePermission } from "src/permissions/entities/role-permission.entity";
import { ERoleType } from "../enums/role-type.enum";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column({ type: "varchar",  length: 20 })
    label: string

    @Column({ type: 'enum', enum: ERoleType })
    type: ERoleType

    @ManyToOne(() => Workplace, (workplace) => workplace.roles, { nullable: false , onDelete: "CASCADE" })
    @JoinColumn({ name: "workplace_id" })
    workplace: Workplace

    @OneToMany(() => RolePermission, (permission) => permission.role, { nullable: false })
    permissions: RolePermission[]
}