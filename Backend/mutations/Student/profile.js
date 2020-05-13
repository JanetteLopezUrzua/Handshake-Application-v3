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

const studentUpdateContactInfo = async (args) => {
  let { id, email, phonenumber } = args;

  let data = {
    email,
    phonenumber,
  };
  console.log(id);
  let student = await Student.findByIdAndUpdate(id, data, { new: true });

  return student;
};

const studentaddEducationInfo = async (args) => {
  let {
    id,
    name,
    primaryschool,
    location,
    degree,
    major,
    passingmonth,
    passingyear,
    gpa,
  } = args;

  let student = await Student.findById(id, {
    schools: {
      $elemMatch: {
        name,
        primaryschool,
        location,
        degree,
        major,
        passingmonth,
        passingyear,
        gpa,
      },
    },
  });

  if (student.schools.length !== 0) return callback(null, 0);
  else {
    let student = await Student.findById(id).select("schools");

    if (student.schools.length === 0) primaryschool = "true";

    student = await Student.findByIdAndUpdate(
      id,
      {
        $push: {
          schools: {
            name,
            primaryschool,
            location,
            degree,
            major,
            passingmonth,
            passingyear,
            gpa,
          },
        },
      },
      { new: true }
    );
    return student;
  }
};

const studentUpdateEducationInfo = async (args) => {
  const {
    id,
    schoolid,
    location,
    degree,
    major,
    passingmonth,
    passingyear,
    gpa,
  } = args;

  let student = await Student.findOneAndUpdate(
    { _id: id, "schools._id": schoolid },
    {
      $set: {
        "schools.$.location": location,
        "schools.$.degree": degree,
        "schools.$.major": major,
        "schools.$.passingmonth": passingmonth,
        "schools.$.passingyear": passingyear,
        "schools.$.gpa": gpa,
      },
    },
    { new: true }
  );

  return student;
};

const studentDeleteEducationInfo = async (args) => {
  let { id, schoolid } = args;

  let student = await Student.findById(id, {
    schools: { $elemMatch: { _id: schoolid, primaryschool: "true" } },
  });

  if (student.schools.length === 0) {
    let student = await Student.findByIdAndUpdate(
      id,
      { $pull: { schools: { _id: schoolid } } },
      { new: true }
    );

    return student;
  } else {
    student = await Student.findByIdAndUpdate(
      id,
      { $pull: { schools: { _id: schoolid } } },
      { new: true }
    );

    let schools = await Student.findById(id).select("schools");

    if (schools.schools.length !== 0) {
      let school = schools.schools[0]._id;

      let student = await Student.findOneAndUpdate(
        { _id: id, "schools._id": school },
        { $set: { "schools.$.primaryschool": "true" } },
        { new: true }
      );

      return student;
    }
    return student;
  }
};

const studentaddWorkInfo = async (args) => {
  const {
    id,
    companyname,
    title,
    startdatemonth,
    startdateyear,
    enddatemonth,
    enddateyear,
    description,
  } = args;

  let student = await Student.findById(id, {
    jobs: {
      $elemMatch: {
        companyname,
        title,
        startdatemonth,
        startdateyear,
        enddatemonth,
        enddateyear,
        description,
      },
    },
  });

  if (student.jobs.length !== 0) return callback(null, 0);
  else {
    let student = await Student.findByIdAndUpdate(
      id,
      {
        $push: {
          jobs: {
            companyname,
            title,
            startdatemonth,
            startdateyear,
            enddatemonth,
            enddateyear,
            description,
          },
        },
      },
      { new: true }
    );
    return student;
  }
};

const studentUpdateWorkInfo = async (args) => {
  const {
    id,
    jobid,
    startdatemonth,
    startdateyear,
    enddatemonth,
    enddateyear,
    description,
  } = args;

  let student = await Student.findOneAndUpdate(
    { _id: id, "jobs._id": jobid },
    {
      $set: {
        "jobs.$.startdatemonth": startdatemonth,
        "jobs.$.startdateyear": startdateyear,
        "jobs.$.enddatemonth": enddatemonth,
        "jobs.$.enddateyear": enddateyear,
        "jobs.$.description": description,
      },
    },
    { new: true }
  );

  return student;
};

const studentDeleteWorkInfo = async (args) => {
  let { id, jobid } = args;

  let student = await Student.findByIdAndUpdate(
    id,
    { $pull: { jobs: { _id: jobid } } },
    { new: true }
  );

  return student;
};

exports.studentUpdateBasicInfo = studentUpdateBasicInfo;
exports.companyUpdateContactInfo = companyUpdateContactInfo;
exports.studentUpdatePictureInfo = studentUpdatePictureInfo;
exports.studentDeletePicture = studentDeletePicture;
exports.studentUpdateCareerObjective = studentUpdateCareerObjective;
exports.studentUpdateContactInfo = studentUpdateContactInfo;
exports.studentaddEducationInfo = studentaddEducationInfo;
exports.studentUpdateEducationInfo = studentUpdateEducationInfo;
exports.studentDeleteEducationInfo = studentDeleteEducationInfo;
exports.studentaddWorkInfo = studentaddWorkInfo;
exports.studentUpdateWorkInfo = studentUpdateWorkInfo;
exports.studentDeleteWorkInfo = studentDeleteWorkInfo;
