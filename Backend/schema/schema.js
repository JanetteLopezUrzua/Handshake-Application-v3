const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const Company = require("../models/Company/Companies");
const Student = require("../models/Student/Students");

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
      type: SchoolType,
      resolve(parent, args) {
        return authors.find((author) => author.id === parent.authorId);
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
    companyAuth: {
      type: CompanyType,
      args: { email: { type: GraphQLString } },
      async resolve(parent, args) {
        let { email } = args;
        let company = await Company.findOne({ email });
        console.log(company);
        return company;
      },
    },
    studentAuth: {
      type: StudentType,
      args: { email: { type: GraphQLString } },
      async resolve(parent, args) {
        let { email } = args;
        let student = await Company.findOne({ email });
        console.log(student);
        return student;
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
        let { name, email, password, location } = args;

        //Check if company email exists
        let company = await Company.findOne({ email });

        if (company) {
          throw new Error("An account with that email already exists");
        }

        company = new Company({
          name,
          email,
          password,
          location,
        });

        const salt = await bcrypt.genSalt(10);

        company.password = await bcrypt.hash(password, salt);

        return await company.save();
      },
    },
    loginCompany: {
      type: CompanyType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let { email, password } = args;

        //Check if company email exists
        let company = await Company.findOne({ email });

        if (!company) {
          throw new Error("Invalid Credentials");
        }

        const isPasswordAMatch = await bcrypt.compare(
          password,
          company.password
        );

        if (!isPasswordAMatch) {
          throw new Error("Invalid Credentials");
        }

        return company;
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
        let { fname, lname, email, password, college } = args;

        //Check if student email exists
        let student = await Student.findOne({ email });

        if (student)
          throw new Error("An account with that email already exists");

        student = new Student({
          fname,
          lname,
          email,
          password,
          schools: {
            name: college,
            primaryschool: "true",
          },
        });

        const salt = await bcrypt.genSalt(10);

        student.password = await bcrypt.hash(password, salt);

        return await student.save();
      },
    },
    loginStudent: {
      type: StudentType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let { email, password } = args;

        //Check if company email exists
        let student = await Student.findOne({ email });

        if (!student) {
          throw new Error("Invalid Credentials");
        }

        const isPasswordAMatch = await bcrypt.compare(
          password,
          student.password
        );

        if (!isPasswordAMatch) {
          throw new Error("Invalid Credentials");
        }

        return student;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
