import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { EnumEntity } from "../enums/entity.enum";

@Entity("user_permissions")
export class UserPermission {
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

    @ManyToOne(() => User, (user) => user.permissions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User
}