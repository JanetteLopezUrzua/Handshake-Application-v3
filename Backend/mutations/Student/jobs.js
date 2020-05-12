const Job = require("../../models/Job/Jobs");
const Student = require("../../models/Student/Students");
const mongoose = require("mongoose");

const studentApplyToJob = async (args) => {
  let { jobid, studentid } = args;

  let student = await Student.findById({
    _id: new mongoose.Types.ObjectId(studentid),
  });

  let job = await Job.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(jobid) },
    {
      $push: {
        applicants: {
          studentid: student._id,
          studentfname: student.fname,
          studentlname: student.lname,
          studentphoto: student.photo,
        },
      },
    },
    { new: true }
  );

  return job;
};

exports.studentApplyToJob = studentApplyToJob;
