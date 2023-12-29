import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ApiEndpointType } from "./api-endpoint-type.enum";
import { ApiReturnType } from "./api-return-type.enum";
@Entity()
export abstract class ApiEndpoint {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300, unique: true})
    name: string;

    @Column({ type: 'enum', default: ApiEndpointType.GET, enum: ApiEndpointType })
    type: ApiEndpointType;

    @Column({ type: 'varchar', length: 300 })
    baseUrl: string;

    @Column({ type: 'enum', default: ApiReturnType.JSON, enum: ApiReturnType })
    returnType: ApiReturnType;

    @Column({ type: 'boolean', default: false })
    isActive: boolean;
}