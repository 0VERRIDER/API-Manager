import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConfig } from './constants';

@Injectable()
export class RedisService {
    private readonly client: Redis;

    constructor() {
        try {
            this.client = new Redis(redisConfig);
        } catch (error) {
            console.error('Error connecting to Redis:', error);
            throw error;
        }
    }

    async get(key: string): Promise<string | null> {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error('Error getting value from Redis:', error);
            throw error;
        }
    }

    async set(key: string, value: string): Promise<void> {
        try {
            await this.client.set(key, value);
        } catch (error) {
            console.error('Error setting value in Redis:', error);
            throw error;
        }
    }

    async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error('Error deleting value from Redis:', error);
            throw error;
        }
    }
}