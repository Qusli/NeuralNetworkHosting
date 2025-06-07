import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EnumEntity } from "../enums/entity.enum";

@Entity("role_permissions")
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    create: boolean

    @Column()
    read: boolean

    @Column()
    update: boolean

    @Column()
    delete: boolean

    @Column({ type: "enum", enum: EnumEntity })
    entity: EnumEntity

    @ManyToOne(() => Role, (role) => role.permissions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "role_id" })
    role: Role
}