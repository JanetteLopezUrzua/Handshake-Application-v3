const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const Company = require("../models/Company/Companies");

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
    // author: {
    //   type: AuthorType,
    //   resolve(parent, args) {
    //     return authors.find((author) => author.id === parent.authorId);
    //   },
    // },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
        return books.filter((book) => book.authorId === parent.id);
      },
    },
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
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find((author) => author.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        let author = {
          name: args.name,
          age: args.age,
          id: args.id,
        };
        authors.push(author);
        console.log("Authors", authors);
        return author;
      },
    },

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
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
