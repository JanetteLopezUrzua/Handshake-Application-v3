const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    deadlinemonth: {
      type: Number,
      required: true,
    },
    deadlineday: {
      type: Number,
      required: true,
    },
    deadlineyear: {
      type: Number,
      required: true,
    },
    deadlinetime: {
      type: String,
      required: true,
    },
    deadlinedaytime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    salarytime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    postingmonth: {
      type: Number,
      required: true,
    },
    postingday: {
      type: Number,
      required: true,
    },
    postingyear: {
      type: Number,
      required: true,
    },
    companyid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
    companyname: {
      type: String,
      required: true,
    },
    companyphoto: {
      type: String,
      required: true,
    },
    applicants: [
      {
        studentid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "students",
          required: true,
        },
        studentfname: {
          type: String,
          required: true,
        },
        studentlname: {
          type: String,
          required: true,
        },
        studentphoto: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);
module.exports = Jobs = mongoose.model("jobs", JobsSchema);
