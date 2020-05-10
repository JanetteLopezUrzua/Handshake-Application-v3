import { gql } from "apollo-boost";

const getStudentStudentsTabQuery = gql`
  query($search: String) {
    students(search: $search) {
      _id
      fname
      lname
      email
      photo
      schools {
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

export { getStudentStudentsTabQuery };
