const Company = require("../../models/Company/Companies");

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

const companyUpdatePictureInfo = async (args) => {
  let { id, photo } = args;

  let data = {
    photo,
  };
  console.log(id);
  let company = await Company.findByIdAndUpdate(id, data, { new: true });

  return company;
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

const companyDeletePicture = async (args) => {
  let { id } = args;

  let company = await Company.findByIdAndUpdate(
    id,
    { $unset: { photo: null } },
    { new: true }
  );

  return company;
};

exports.companyUpdateBasicInfo = companyUpdateBasicInfo;
exports.companyUpdateContactInfo = companyUpdateContactInfo;
exports.companyUpdatePictureInfo = companyUpdatePictureInfo;
exports.companyUpdateName = companyUpdateName;
exports.companyDeletePicture = companyDeletePicture;
