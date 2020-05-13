import { gql } from "apollo-boost";

const getStudentPictureInfoQuery = gql`
  query($id: ID) {
    student(id: $id) {
      fname
      lname
      photo
      schools {
        _id
        name
        primaryschool
        location
        degree
        major
        passingmonth
        passingyear
        gpa
      }
    }
  }
`;

const getStudentBasicInfoQuery = gql`
  query($id: ID) {
    student(id: $id) {
      fname
      lname
      dob
      city
      state
      country
    }
  }
`;

const getStudentCareerObjectiveQuery = gql`
  query($id: ID) {
    student(id: $id) {
      objective
    }
  }
`;

const getStudentContactInfoQuery = gql`
  query($id: ID) {
    student(id: $id) {
      email
      phonenumber
    }
  }
`;

const getStudentSchoolsInfoQuery = gql`
  query($id: ID) {
    student(id: $id) {
      schools {
        _id
        name
        primaryschool
        location
        degree
        major
        passingmonth
        passingyear
        gpa
      }
    }
  }
`;

const getStudentJobsInfoQuery = gql`
  query($id: ID) {
    student(id: $id) {
      works
    }
  }
`;

export {
  getStudentPictureInfoQuery,
  getStudentBasicInfoQuery,
  getStudentCareerObjectiveQuery,
  getStudentContactInfoQuery,
  getStudentSchoolsInfoQuery,
  getStudentJobsInfoQuery,
};
