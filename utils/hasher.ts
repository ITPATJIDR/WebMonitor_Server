import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hash_Password = async (password: string) => {
	return await bcrypt.hash(password, 10)
}

export const compare_Password = async (password: string, hashPassword: string) => {
	return await bcrypt.compare(password, hashPassword)
}

export const sign_jwt = (id: string) => {
  return jwt.sign(id, process.env.JWT_SECRET as string);
};

export const verify_jwt = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};