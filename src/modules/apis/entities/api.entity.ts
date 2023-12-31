import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ApiType } from "../../../common/enums/api-type.enum";

@Entity()
export abstract class Api {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300, unique: true})
    name: string;

    @Column({ type: 'enum', default: ApiType.REST, enum: ApiType })
    type: ApiType;

    @Column({ type: 'uuid', nullable: true })
    userId: string;

    @Column({ type: 'uuid', nullable: true })
    authId: string;

    @Column({ type: 'uuid', nullable: true })
    endpointId: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    baseUrl: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    description: string;

    @Column({ type: 'boolean', default: false })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    devMode: boolean;
}