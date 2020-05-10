const Job = require("../../models/Job/Jobs");
const Applications = require("../../models/Job/Applications");
const Company = require("../../models/Company/Companies");
const mongoose = require("mongoose");

const companyNewJob = async (args) => {
  let {
    company_id,
    title,
    deadlinemonth,
    deadlineday,
    deadlineyear,
    deadlinetime,
    deadlinedaytime,
    location,
    salary,
    salarytime,
    description,
    category,
    postingmonth,
    postingday,
    postingyear,
  } = args;

  let company = await Company.findById({
    _id: new mongoose.Types.ObjectId(company_id),
  });

  let job = new Job({
    title,
    deadlinemonth,
    deadlineday,
    deadlineyear,
    deadlinetime,
    deadlinedaytime,
    location,
    salary,
    salarytime,
    description,
    category,
    postingmonth,
    postingday,
    postingyear,
    companyid: new mongoose.Types.ObjectId(company_id),
    companyname: company.name,
    companyphoto: company.photo,
  });

  return await job.save();
};

const companyDeleteJob = async (args) => {
  let { id } = args;

  let job = await Job.deleteOne({
    _id: mongoose.Types.ObjectId(id),
  });

  await Applications.deleteMany({
    jobid: mongoose.Types.ObjectId(id),
  });

  return job;
};

exports.companyNewJob = companyNewJob;
exports.companyDeleteJob = companyDeleteJob;
