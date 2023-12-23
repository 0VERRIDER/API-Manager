import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    SUPPORT = 'support',
}

@Entity()
export abstract class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300 })
    username: string;

    @Column({ type: 'varchar', length: 300 })
    email: string;

    @Column({ type: 'varchar', length: 300 })
    password: string;

    @Column({ type: 'varchar', length: 300 })
    firstName: string;

    @Column({ type: 'varchar', length: 300 })
    lastName: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @Column({ type: 'enum', default: UserRole.CUSTOMER, enum: UserRole })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @Column({ type: 'varchar', length: 300 })
    createdBy: string;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @Column({ type: 'varchar', length: 300 })
    lastChangedBy: string;
}