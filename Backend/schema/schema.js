const graphql = require("graphql");
const Company = require("../models/Company/Companies");
const Student = require("../models/Student/Students");

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
} = require("../mutations/Student/profile");

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
    skillset: {
      type: SkillType,
      resolve(parent, args) {
        return authors.find((author) => author.id === parent.authorId);
      },
    },
    schools: {
      type: new GraphQLList(SchoolType),
      resolve(parent, args) {
        return parent.schools;
      },
    },
    jobs: {
      type: JobType,
      resolve(parent, args) {
        return authors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});

const SkillType = new GraphQLObjectType({
  name: "Skill",
  fields: () => ({
    _id: { type: GraphQLID },
    skill: { type: GraphQLString },
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

const JobType = new GraphQLObjectType({
  name: "Job",
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
        console.log("nameorcollege:", search);

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
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
