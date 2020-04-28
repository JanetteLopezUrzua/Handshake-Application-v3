import { gql } from "apollo-boost";

const addStudentMutation = gql`
  mutation(
    $fname: String
    $lname: String
    $email: String
    $password: String
    $college: String
  ) {
    addStudent(
      fname: $fname
      lname: $lname
      email: $email
      password: $password
      college: $college
    ) {
      _id
    }
  }
`;

const loginStudentMutation = gql`
  mutation($email: String, $password: String) {
    loginStudent(email: $email, password: $password) {
      _id
    }
  }
`;

export { addStudentMutation, loginStudentMutation };
