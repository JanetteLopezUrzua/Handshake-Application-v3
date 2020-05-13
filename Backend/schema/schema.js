const graphql = require("graphql");
const Company = require("../models/Company/Companies");
const Student = require("../models/Student/Students");
const Job = require("../models/Job/Jobs");
const mongoose = require("mongoose");

const { companySignUp, companyLogIn } = require("../mutations/Company/auth");
const {
  companyUpdateBasicInfo,
  companyUpdateContactInfo,
  companyUpdatePictureInfo,
  companyUpdateName,
  companyDeletePicture,
} = require("../mutations/Company/profile");
const { studentSignUp, studentLogIn } = require("../mutations/Student/auth");
const {
  studentUpdatePictureInfo,
  studentDeletePicture,
  studentUpdateBasicInfo,
  studentUpdateCareerObjective,
  studentUpdateContactInfo,
  studentaddEducationInfo,
  studentUpdateEducationInfo,
  studentDeleteEducationInfo,
  studentaddWorkInfo,
  studentUpdateWorkInfo,
  studentDeleteWorkInfo,
} = require("../mutations/Student/profile");
const {
  companyNewJob,
  companyDeleteJob,
} = require("../mutations/Company/jobs");
const { studentApplyToJob } = require("../mutations/Student/jobs");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    location: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    phonenumber: {
      type: GraphQLString,
    },
    photo: {
      type: GraphQLString,
    },
  }),
});

const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    _id: { type: GraphQLID },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    dob: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    photo: {
      type: GraphQLString,
    },
    objective: {
      type: GraphQLString,
    },
    phonenumber: {
      type: GraphQLString,
    },
    schools: {
      type: new GraphQLList(SchoolType),
      resolve(parent, args) {
        return parent.schools;
      },
    },
    jobs: {
      type: new GraphQLList(WorkType),
      resolve(parent, args) {
        return parent.jobs;
      },
    },
  }),
});

const SchoolType = new GraphQLObjectType({
  name: "School",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    primaryschool: { type: GraphQLString },
    location: { type: GraphQLString },
    degree: { type: GraphQLString },
    major: { type: GraphQLString },
    passingmonth: { type: GraphQLInt },
    passingyear: { type: GraphQLInt },
    gpa: { type: GraphQLString },
  }),
});

const WorkType = new GraphQLObjectType({
  name: "Work",
  fields: () => ({
    _id: { type: GraphQLID },
    companyname: { type: GraphQLString },
    title: { type: GraphQLString },
    startdatemonth: { type: GraphQLInt },
    startdateyear: { type: GraphQLInt },
    enddatemonth: { type: GraphQLInt },
    enddateyear: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});

const JobType = new GraphQLObjectType({
  name: "Job",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    deadlinemonth: { type: GraphQLInt },
    deadlineday: { type: GraphQLInt },
    deadlineyear: { type: GraphQLInt },
    deadlinetime: { type: GraphQLString },
    deadlinedaytime: { type: GraphQLString },
    location: { type: GraphQLString },
    salary: { type: GraphQLString },
    salarytime: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    postingmonth: { type: GraphQLInt },
    postingday: { type: GraphQLInt },
    postingyear: { type: GraphQLInt },
    companyid: { type: GraphQLID },
    companyname: { type: GraphQLString },
    companyphoto: { type: GraphQLString },
    applicants: {
      type: new GraphQLList(ApplicantType),
      resolve(parent, args) {
        return parent.applicants;
      },
    },
  }),
});

const ApplicantType = new GraphQLObjectType({
  name: "Applicant",
  fields: () => ({
    _id: { type: GraphQLID },
    studentid: { type: GraphQLID },
    studentfname: { type: GraphQLString },
    studentlname: { type: GraphQLString },
    studentphoto: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        let { id } = args;
        let company = await Company.findById(id).select("-password");
        console.log(company);
        return company;
      },
    },
    student: {
      type: StudentType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        let { id } = args;
        let student = await Student.findById(id).select("-password");
        console.log(student);
        return student;
      },
    },
    students: {
      type: new GraphQLList(StudentType),
      args: { search: { type: GraphQLString } },
      async resolve(parent, args) {
        const { search } = args;
        let studentsList = await Student.find({
          $or: [
            {
              fname: { $regex: ".*" + search + ".*", $options: "i" },
            },
            {
              lname: { $regex: ".*" + search + ".*", $options: "i" },
            },
            {
              "schools.name": {
                $regex: ".*" + search + ".*",
                $options: "i",
              },
            },
          ],
        });
        return studentsList;
      },
    },
    jobs: {
      type: new GraphQLList(JobType),
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const { id } = args;
        let jobsList = await Job.find({
          companyid: id,
        });

        return jobsList;
      },
    },
    jobsSearch: {
      type: new GraphQLList(JobType),
      args: { search: { type: GraphQLString } },
      async resolve(parent, args) {
        const { search } = args;
        let jobsList = await Job.find({
          $or: [
            { title: { $regex: ".*" + search + ".*", $options: "i" } },
            {
              companyname: {
                $regex: ".*" + search + ".*",
                $options: "i",
              },
            },
          ],
        });
        return jobsList;
      },
    },
    job: {
      type: JobType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const { id } = args;
        let job = await Job.findById(id);

        return job;
      },
    },
    applications: {
      type: new GraphQLList(JobType),
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const { id } = args;
        let jobsList = await Job.find({
          "applicants.studentid": new mongoose.Types.ObjectId(id),
        });
        return jobsList;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return companySignUp(args);
      },
    },
    loginCompany: {
      type: CompanyType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return companyLogIn(args);
      },
    },
    updateCompanyBasicInfo: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return companyUpdateBasicInfo(args);
      },
    },
    updateCompanyContactInfo: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        phonenumber: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return companyUpdateContactInfo(args);
      },
    },
    updateCompanyPictureInfo: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
        photo: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return companyUpdatePictureInfo(args);
      },
    },
    updateCompanyName: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return companyUpdateName(args);
      },
    },
    deleteCompanyPicture: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return companyDeletePicture(args);
      },
    },
    createCompanyNewJob: {
      type: JobType,
      args: {
        title: { type: GraphQLString },
        deadlinemonth: { type: GraphQLInt },
        deadlineday: { type: GraphQLInt },
        deadlineyear: { type: GraphQLInt },
        deadlinetime: { type: GraphQLString },
        deadlinedaytime: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        salarytime: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        postingmonth: { type: GraphQLInt },
        postingday: { type: GraphQLInt },
        postingyear: { type: GraphQLInt },
        company_id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return companyNewJob(args);
      },
    },
    deleteCompanyJob: {
      type: JobType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return companyDeleteJob(args);
      },
    },
    addStudent: {
      type: StudentType,
      args: {
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        college: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentSignUp(args);
      },
    },
    loginStudent: {
      type: StudentType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentLogIn(args);
      },
    },
    updateStudentPictureInfo: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        photo: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentUpdatePictureInfo(args);
      },
    },
    deleteStudentPicture: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return studentDeletePicture(args);
      },
    },
    updateStudentBasicInfo: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        dob: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentUpdateBasicInfo(args);
      },
    },
    updateStudentCareerObjective: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        objective: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentUpdateCareerObjective(args);
      },
    },
    updateStudentContactInfo: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        phonenumber: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentUpdateContactInfo(args);
      },
    },
    addStudentEducationInfo: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        primaryschool: { type: GraphQLString },
        location: { type: GraphQLString },
        degree: { type: GraphQLString },
        major: { type: GraphQLString },
        passingmonth: { type: GraphQLInt },
        passingyear: { type: GraphQLInt },
        gpa: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentaddEducationInfo(args);
      },
    },
    updateStudentEducationInfo: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        schoolid: { type: GraphQLID },
        location: { type: GraphQLString },
        degree: { type: GraphQLString },
        major: { type: GraphQLString },
        passingmonth: { type: GraphQLInt },
        passingyear: { type: GraphQLInt },
        gpa: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentUpdateEducationInfo(args);
      },
    },
    deleteStudentEducationInfo: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        schoolid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return studentDeleteEducationInfo(args);
      },
    },
    addStudentWorkInfo: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        companyname: { type: GraphQLString },
        title: { type: GraphQLString },
        startdatemonth: { type: GraphQLInt },
        startdateyear: { type: GraphQLInt },
        enddatemonth: { type: GraphQLInt },
        enddateyear: { type: GraphQLInt },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentaddWorkInfo(args);
      },
    },
    updateStudentWorkInfo: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        jobid: { type: GraphQLID },
        startdatemonth: { type: GraphQLInt },
        startdateyear: { type: GraphQLInt },
        enddatemonth: { type: GraphQLInt },
        enddateyear: { type: GraphQLInt },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentUpdateWorkInfo(args);
      },
    },
    deleteStudentWorkInfo: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        jobid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return studentDeleteWorkInfo(args);
      },
    },
    applyToJob: {
      type: JobType,
      args: {
        jobid: { type: GraphQLID },
        studentid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return studentApplyToJob(args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
