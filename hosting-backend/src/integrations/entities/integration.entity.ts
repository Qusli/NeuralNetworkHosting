import { Workplace } from "src/workplaces/entities/workplace.entiy";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("integrations")
export class Integration {
    @PrimaryColumn("uuid")
    uuid: string

    @Column({ type: "varchar", length: 100 })
    title: string

    @Column({ nullable: true })
    description: string

    @ManyToOne(() => Workplace, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "workplace_id" })
    workplace: Workplace
}