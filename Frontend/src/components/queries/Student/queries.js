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

export { getStudentPictureInfoQuery, getStudentBasicInfoQuery };
