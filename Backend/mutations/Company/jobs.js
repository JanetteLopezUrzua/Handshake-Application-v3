const Job = require("../../models/Job/Jobs");
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
  });

  return await job.save();
};

exports.companyNewJob = companyNewJob;
