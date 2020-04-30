const Student = require("../../models/Student/Students");

const studentUpdateBasicInfo = async (args) => {
  let { id, fname, lname, dob, city, state, country } = args;

  let data = {
    fname,
    lname,
    dob,
    city,
    state,
    country,
  };
  console.log(id);
  let student = await Student.findByIdAndUpdate(id, data, { new: true });

  return student;
};

const companyUpdateContactInfo = async (args) => {
  let { id, email, phonenumber } = args;

  let data = {
    email,
    phonenumber,
  };
  console.log(id);
  let company = await Company.findByIdAndUpdate(id, data, { new: true });

  return company;
};

const studentUpdatePictureInfo = async (args) => {
  let { id, photo } = args;

  let data = {
    photo,
  };
  console.log(id);
  let student = await Student.findByIdAndUpdate(id, data, { new: true });

  return student;
};

const studentDeletePicture = async (args) => {
  let { id } = args;

  let student = await Student.findByIdAndUpdate(
    id,
    { $unset: { photo: null } },
    { new: true }
  );

  return student;
};

const studentUpdateCareerObjective = async (args) => {
  let { id, objective } = args;

  let data = {
    objective,
  };
  console.log(id);
  let student = await Student.findByIdAndUpdate(id, data, { new: true });

  return student;
};

exports.studentUpdateBasicInfo = studentUpdateBasicInfo;
exports.companyUpdateContactInfo = companyUpdateContactInfo;
exports.studentUpdatePictureInfo = studentUpdatePictureInfo;
exports.studentDeletePicture = studentDeletePicture;
exports.studentUpdateCareerObjective = studentUpdateCareerObjective;
