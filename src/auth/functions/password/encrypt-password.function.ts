import {genSalt, hash as hashFunc}from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await genSalt();
  const hash = await hashFunc(password, salt);

  return hash;
};