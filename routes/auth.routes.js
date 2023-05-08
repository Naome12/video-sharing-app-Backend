import express from "express";
import {googleAuth, signin, signup } from "../controllers/auth.controllers.js";

const router = express.Router()

//create a user
router.post("/signup",signup); 

//sign in
router.post("/signin",signin);

//google auth
router.post("/googleAuth",googleAuth);

export default router;