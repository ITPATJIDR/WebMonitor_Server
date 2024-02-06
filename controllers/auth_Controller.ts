import _ from "lodash"
import prisma from "../utils/database"
import { compare_Password, hash_Password, sign_jwt, verify_jwt } from "../utils/hasher"
import {Request, Response, NextFunction} from "express"

const auth_Controller = {
	register: async (req: Request, res: Response, next: NextFunction) => {
		try{
			const { username, password } = req.body;
			const checkUserExists = await prisma.user.findUnique({
				where:{
					username: username
				}
			})

			if(_.isNull(checkUserExists)){
				const newPassword = await hash_Password(password)

				const createNewUser = await prisma.user.create({
					data:{
						username: username,
						password: newPassword
					}
				})

				if(!_.isEmpty(createNewUser)){
					res.status(200).json({message: "Register Success", status:200})
				}else{
					res.status(200).json({message: "Register Failed", status:400})
				}
			}else{
				res.status(200).json({message: "Username is already Exist", status:400})
			}
		}catch(err: unknown){ 
			res.status(200).json({message: "Internal Server Error", status:500})
		}

	},
	login: async (req: Request, res: Response, next: NextFunction) => {
		try{
			const { username, password } = req.body;
			const checkUserExists = await prisma.user.findUnique({
				where:{
					username: username
				}
			})

			if(!_.isNull(checkUserExists)){
				const comparePassword = await compare_Password(password, checkUserExists.password )

				if(comparePassword){
					const session = sign_jwt(checkUserExists.id.toString())
					res.cookie("session", session,{
						httpOnly: true,
						path: '/',
						maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
						secure: true
					})
					res.status(200).json({message: "Login Success", status:200})
				}else{
					res.status(200).json({message: "Login Failed", status:400})
				}
			}else{
				res.status(200).json({message: "Login Failed", status:400})
			}
		}catch(err: unknown){ 
			res.status(200).json({message: "Internal Server Error", status:500})
		}

	},
	getUser: async (req: Request, res: Response, next: NextFunction) => {
		try{
			const session = req.cookies["session"]
			if(session){
				const checkJwt = verify_jwt(session)
				const getUser = await prisma.user.findUnique({
					where:{
						id: Number(checkJwt)
					},
					select: {
						id: true, 
						username: true
					}
				})
				res.status(200).json({data: getUser, status:200})
			}else{
				res.status(200).json({message: "Please Login", status:403})
			}
		}catch(err) {
			res.status(200).json({message: "Internal Server Error", status:500})
		}
	},
	isLogin: async (req: Request, res: Response, next: NextFunction) => {
		try{
			const session = req.cookies["session"]
			if (session){ 
				res.status(200).json({data: true, status:200})
			}else{
				res.status(200).json({data: false, status:403})
			}
		}catch(err) {
			res.status(200).json({message: "Internal Server Error", status:500})
		}
	},
	logout: async (req: Request, res: Response, next: NextFunction) => {
		try{
			res.clearCookie("session", {path: "/"})
			res.status(200).json({message: "Logout Success", status:200})
		}catch(err) {
			res.status(200).json({message: "Internal Server Error", status:500})
		}
	}
}

export default auth_Controller