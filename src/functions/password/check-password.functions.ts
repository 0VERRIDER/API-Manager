import { compare as checkHash } from 'bcrypt';

export const checkPassword = async (password: string, hash: string): Promise<boolean> => {
  const isMatch = await checkHash(password, hash);

  return isMatch;
};