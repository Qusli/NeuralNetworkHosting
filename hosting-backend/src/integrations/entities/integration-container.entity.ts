import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Integration } from "./integration.entity";

@Entity("integration_containers")
export class IntegrationContainer {
    @PrimaryColumn({ type: "uuid", name: "container_uuid" })
    containerUuid: string

    @ManyToOne(() => Integration)
    @JoinColumn({ name: "integration_uuid" })
    integration: Integration
}