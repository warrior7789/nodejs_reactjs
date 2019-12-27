const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.cpassword = !isEmpty(data.cpassword) ? data.cpassword : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 character";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is  Required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Emial field is  Required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Emial is not Valid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password field is  Required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 2 and 30 character";
  }
  console.log(validator.isEmpty(data.cpassword));
  if (validator.isEmpty(data.cpassword)) {
    errors.cpassword = "confirm password field is  Required";
  }

  if (
    !validator.equals(data.password, data.cpassword) &&
    !validator.isEmpty(data.cpassword)
  ) {
    errors.cpassword = "Password must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
