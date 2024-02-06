const auth_Router = require("express").Router();
import auth_Controller from "../controllers/auth_Controller"

auth_Router.post("/register", auth_Controller.register)

export default auth_Router