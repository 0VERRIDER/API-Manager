import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConfig } from './constants';

@Injectable()
export class RedisService {
    private readonly client: Redis;

    constructor() {
        this.client = new Redis(redisConfig);
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
