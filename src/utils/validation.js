const validator = require("validator");
const bcrypt = require("bcrypt");


const validateEmailOnly=(email)=>{
if(!validator.isEmail(email)){
    throw new Error("Invalid Email Format ");
}
};

const validateUserSignup = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter valid name ");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Incorrect email Format ");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is too weak ");
  }
};
const validateProfileData = (req) => {
  const allowedEdit=["firstName","lastName","contactInfo","gender","age","skills","about","photoUrl"];
  const isEditAllowed=Object.keys(req.body).every(field=>allowedEdit.includes(field));
  return isEditAllowed;
};

const validatePassword = async (req) => {
  const { password } = req.body; 
  
  return await bcrypt.compare(password, req.user.password);
};

module.exports = {validateUserSignup, validateEmailOnly,validateProfileData ,validatePassword};