import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ApiType } from "./api-type.enum";

@Entity()
export abstract class ApiAuth {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', default: ApiType.REST, enum: ApiType })
    type: ApiType;

    @Column({ type: 'varchar', length: 300, nullable: true })
    accessToken: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    refreshToken: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    redirectUri: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    username: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    password: string;

    @Column({ type: 'timestamp', nullable: true })
    expiresAt: Date;
}