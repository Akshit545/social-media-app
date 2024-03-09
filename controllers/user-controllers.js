import User from "../models/User";

// get all users data
const getAllUsers = async (req, res, next) => {
  let users;

  // get users from db
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }

  // return error when error getting user data or no users are found
  if (!users) {
    return res.status(404).json({ message: "Error while fetching users data" });
  } else if(users.length === 0) {
    console.log("No users in db");
    return res.status(404).json({ message: "No user found" });
  }

  // return success response if users are found
  return res.status(200).json({users});
}

// add user 
const addUser = async (req, res, next) => {
  const { username: name, password, email } = req.body;

  // check for existing user
  try {
    const alreadyExistingUser = await User.findOne({email});

    if (alreadyExistingUser) {
      return res.status(404).json({message:"Email is already taken."});
    }
  } catch (error) {
    return res.status(404).json({ message: "Error while connecting to database"});
  }

  // make new user document
  const newUser = new User({name, password, email});

  // save user
  try {
    await newUser.save();
  } catch (error) {
    return res.status(404).json({ message: "Error while creating new user"});
  }

  // return success response if no errors
  return res.status(201).json({ message: "User registered successfully", newUser});
}

export {
  getAllUsers,
  addUser
}