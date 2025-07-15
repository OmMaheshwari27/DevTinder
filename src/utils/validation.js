const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

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

module.exports = {validateUserSignup, validateEmailOnly};