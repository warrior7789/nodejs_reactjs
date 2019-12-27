const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Emial field is  Required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Emial is not Valid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password field is  Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
