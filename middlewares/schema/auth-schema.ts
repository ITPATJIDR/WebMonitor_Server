import { body } from "express-validator"

const authSchema = [
	body("username").exists().notEmpty().withMessage("Please enter a Username"),
	body("password").exists().notEmpty().withMessage("Please enter a Password"),
]

export { authSchema };