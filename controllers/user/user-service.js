import User from "../../models/User";
import bcrypt from "bcryptjs";

// get user data from db
const getExisitingUserData = async ({email}) => {
  try {
    const alreadyExistingUser = await User.findOne({email});

    if (alreadyExistingUser)
      return alreadyExistingUser;
  } catch (error) {
    throw new Error(error);
  }
}

//check for existng user
const checkExistingUser = async ({email}) => {
  try {
    const alreadyExistingUser = await getExisitingUserData({email});

    if (alreadyExistingUser)
      return true;
  } catch (error) {
    return new Error(error); 
  }

  return false;
}

// check for existing user data valid or not
const checkExistingUserDataValidOrNot = ({password, alreadyExistingUser: userData}) => {
  const isValidPassword = bcrypt.compareSync(password, userData.password);

  if (!isValidPassword)
    return false;

  return true;
}

export {
  checkExistingUser,
  getExisitingUserData,
  checkExistingUserDataValidOrNot,
}