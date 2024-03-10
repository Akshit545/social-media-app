import User from "../../models/User";
import bcrypt from "bcryptjs";
import { checkExistingUser, checkExistingUserDataValidOrNot, getExisitingUserData } from "./user-service";

// get all users data
const getAllUsers = async (req, res, next) => {
  let users;

  // get users from db
  try {
    users = await User.find();
  } catch (error) {
    // return error when error getting user data
    return res.status(500).json({ message: "Error while fetching users data" });
  }

  // return error when no users are found
  if (!users) {
    console.log("No users in db");
    return res.status(404).json({ message: "No user found" });
  }

  // return success response if users are found
  return res.status(200).json({users});
}

// signup user 
const addUser = async (req, res, next) => {
  const { username: name, password, email } = req.body;

  // check for existing user
  try {
    const alreadyExistingUser = await checkExistingUser({email});
  
    if (alreadyExistingUser) {
      return res.status(403).json({message:"Email is already taken."});
    }
  } catch (error) {
    return res.status(500).json({ message: "Error while connecting to database"});
  }

  // encrypt the password 
  const encryptedPass = bcrypt.hashSync(password);

  // make new user document
  const newUser = new User({name, password: encryptedPass, email});

  // save user
  try {
    await newUser.save();
  } catch (error) {
    return res.status(500).json({ message: "Error while creating new user"});
  }

  // return success response if no errors
  return res.status(201).json({ message: "User registered successfully", newUser});
}

// login user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // check if user exists or not
  try {
    const alreadyExistingUser = await getExisitingUserData({email});

    if (!alreadyExistingUser) {
      return res.status(404).json({message:"No User found"});
    }

    const validUser = checkExistingUserDataValidOrNot({password, alreadyExistingUser})
    if (!validUser) {
      return res.status(400).json( {message : "Please enter valid password"} )
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while connecting to database"});
  }

  return res.status(200).json({ message: "Login successful!!"})
}

export {
  getAllUsers,
  addUser,
  loginUser
}