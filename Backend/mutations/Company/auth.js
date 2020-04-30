const Company = require("../../models/Company/Companies");
const bcrypt = require("bcryptjs");

const companySignUp = async (args) => {
  let { name, email, password, location } = args;

  //Check if company email exists
  let company = await Company.findOne({ email });

  if (company) {
    throw new Error("An account with that email already exists");
  }

  company = new Company({
    name,
    email,
    password,
    location,
  });

  const salt = await bcrypt.genSalt(10);

  company.password = await bcrypt.hash(password, salt);

  return await company.save();
};

const companyLogIn = async (args) => {
  let { email, password } = args;

  //Check if company email exists
  let company = await Company.findOne({ email });

  if (!company) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordAMatch = await bcrypt.compare(password, company.password);

  if (!isPasswordAMatch) {
    throw new Error("Invalid Credentials");
  }

  return company;
};

exports.companySignUp = companySignUp;
exports.companyLogIn = companyLogIn;
