import express from "express";
import { addUser, getAllUsers, loginUser } from "../controllers/user/user-controllers";

const router = express.Router();

// all user data related api calls go here
router.get('/', getAllUsers);

// signup user api call
router.post("/signup", addUser);

//login user API Call
router.post('/login', loginUser) 

export default router;