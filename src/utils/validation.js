const validator = require("validator");
const bcrypt = require("bcrypt");


const validateEmailOnly=(email)=>{
if(!validator.isEmail(email)){
    throw new Error("Invalid Email Format");
}
};

const validateUserSignup = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter valid name");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Incorrect email Format");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is too weak");
  }
};
const validateProfileData = (req) => {
  const allowedEdit=["firstName","lastName","contactInfo","gender","age"];
  const isEditAllowed=Object.keys(req.body).every(field=>allowedEdit.includes(field));
  return isEditAllowed;
};

const validatePassword = async (req) => {
  const { password,new_password } = req.body; 
  console.log(new_password);
  
  return await bcrypt.compare(password, req.user.password);
};

module.exports = {validateUserSignup, validateEmailOnly,validateProfileData ,validatePassword};