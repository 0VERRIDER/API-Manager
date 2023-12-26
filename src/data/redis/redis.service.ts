import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as process from 'process';

@Injectable()
export class RedisService {
    private readonly client: Redis;
    
    constructor() {
        this.client = new Redis({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
        });
    }
    
    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }
    
    async set(key: string, value: string): Promise<void> {
        await this.client.set(key, value);
    }
    
    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}
