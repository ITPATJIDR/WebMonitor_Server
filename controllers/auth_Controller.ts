import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import prisma from "../utils/database"

const auth_Controller = {
	register: async (req: Request, res: Response, next: NextFunction) => {
		try{

			res.status(200).json({message: "HI", status:200})
		}catch(err: any){ 
			res.status(200).json({message: "Internal Server Error", status:500})
		}
	}
}

export default auth_Controller