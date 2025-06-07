import { Workplace } from "src/workplaces/entities/workplace.entiy";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("hostings")
export class Hosting {
    @PrimaryColumn()
    id: number

    @Column({ type: "varchar", length: 50 })
    title: string

    @Column({ nullable: true })
    description: string

    @Column()
    host: string

    @Column()
    port: number

    @Column()
    hostType: number

    @Column()
    status: number

    @ManyToOne(() => Workplace, { onDelete: "CASCADE" })
    @JoinColumn({ name: "workplace_id" })
    workplace: Workplace
}
