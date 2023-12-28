import * as process from 'process';

export const redisConfig = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    enableReadyCheck: process.env.REDIS_ENABLE_READY_CHECK === 'true',
}