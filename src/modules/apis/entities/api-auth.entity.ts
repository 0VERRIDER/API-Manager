import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ApiAuthType } from "../../../common/enums/api-auth-type.enum";

@Entity()
export abstract class ApiAuth {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300, nullable: true})
    name: string;

    @Column({ type: 'uuid', nullable: true })
    apiId: string;

    @Column({ type: 'enum', default: ApiAuthType.BEARER, enum: ApiAuthType })
    type: ApiAuthType;

    @Column({ type: 'varchar', length: 300, nullable: true, default: 'Bearer' })
    bearerName: string;

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