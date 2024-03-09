import express from "express";
import { addUser, getAllUsers } from "../controllers/user-controllers";

const router = express.Router();

// all user data related api calls go here
router.get('/', getAllUsers);

// signup user api call
router.post("/signup", addUser);

export default router;