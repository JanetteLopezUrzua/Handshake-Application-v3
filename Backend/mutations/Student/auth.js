const Student = require("../../models/Student/Students");
const bcrypt = require("bcryptjs");

const studentSignUp = async (args) => {
  let { fname, lname, email, password, college } = args;

  //Check if student email exists
  let student = await Student.findOne({ email });

  if (student) throw new Error("An account with that email already exists");

  student = new Student({
    fname,
    lname,
    email,
    password,
    schools: {
      name: college,
      primaryschool: "true",
    },
  });

  const salt = await bcrypt.genSalt(10);

  student.password = await bcrypt.hash(password, salt);

  return await student.save();
};

const studentLogIn = async (args) => {
  let { email, password } = args;

  //Check if company email exists
  let student = await Student.findOne({ email });

  if (!student) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordAMatch = await bcrypt.compare(password, student.password);

  if (!isPasswordAMatch) {
    throw new Error("Invalid Credentials");
  }

  return student;
};

exports.studentSignUp = studentSignUp;
exports.studentLogIn = studentLogIn;
