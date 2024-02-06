const auth_Router = require("express").Router();
import auth_Controller from "../controllers/auth_Controller"
import { authSchema } from "../middlewares/schema/auth-schema";
import { validateRequestSchema } from "../middlewares/validate/validate-request";

auth_Router.post("/register", authSchema, validateRequestSchema, auth_Controller.register);
auth_Router.post("/login", authSchema, validateRequestSchema, auth_Controller.login);
auth_Router.get("/getUser", auth_Controller.getUser)
auth_Router.get("/isLogin", auth_Controller.isLogin)
auth_Router.get("/logout", auth_Controller.logout)

export default auth_Router