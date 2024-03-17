import User from "../../models/User";
import bcrypt from "bcryptjs";

// get user data from db by email
const getExisitingUserDataByEmail = async ({email}) => {
  try {
    const alreadyExistingUser = await User.findOne({email});

    return alreadyExistingUser;
  } catch (error) {
    throw new Error(error);
  }
}

// get user data from db by id
const getExisitingUserDataById = async ({id}) => {
  try {
    const alreadyExistingUser = await User.findById(id);

    return alreadyExistingUser;
  } catch (error) {
    throw new Error(error);
  }
}

//check for existng user
const checkExistingUser = async ({email}) => {
  try {
    const alreadyExistingUser = await getExisitingUserDataByEmail({email});

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
  getExisitingUserDataByEmail,
  checkExistingUserDataValidOrNot,
  getExisitingUserDataById,
}