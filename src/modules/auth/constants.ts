require('dotenv').config();

export const jwtConstants = {
    accessSecret: process.env.JWT_SECRET,
    accessTokenAge: process.env.ACCESS_TOKEN_AGE,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshTokenAge: process.env.REFRESH_TOKEN_AGE,
  };

export const sessionConstants = {
    secret: process.env.SESSION_SECRET,
  };
