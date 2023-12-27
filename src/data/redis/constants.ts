import * as process from 'process';

export const redisConfig = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    enableReadyCheck: Boolean(process.env.REDIS_READY_CHECK),
}