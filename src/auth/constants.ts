import { randomBytes } from 'crypto';

export const jwtConstants = {
  secret: randomBytes(256).toString('base64'),
};