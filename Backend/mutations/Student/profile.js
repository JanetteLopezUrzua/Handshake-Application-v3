const Student = require("../../models/Student/Students");

const companyUpdateBasicInfo = async (args) => {
  let { id, location, description } = args;

  let data = {
    location,
    description,
  };
  console.log(id);
  let company = await Company.findByIdAndUpdate(id, data, { new: true });

  return company;
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

const companyUpdateName = async (args) => {
  let { id, name } = args;

  let data = {
    name,
  };
  console.log(id);
  let company = await Company.findByIdAndUpdate(id, data, { new: true });

  return company;
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

exports.companyUpdateBasicInfo = companyUpdateBasicInfo;
exports.companyUpdateContactInfo = companyUpdateContactInfo;
exports.studentUpdatePictureInfo = studentUpdatePictureInfo;
exports.companyUpdateName = companyUpdateName;
exports.studentDeletePicture = studentDeletePicture;
