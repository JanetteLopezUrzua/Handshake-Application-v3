import { gql } from "apollo-boost";

const addCompanyMutation = gql`
  mutation(
    $name: String
    $email: String
    $password: String
    $location: String
  ) {
    addCompany(
      name: $name
      email: $email
      password: $password
      location: $location
    ) {
      _id
    }
  }
`;

const loginCompanyMutation = gql`
  mutation($email: String, $password: String) {
    loginCompany(email: $email, password: $password) {
      _id
    }
  }
`;

export { addCompanyMutation, loginCompanyMutation };
