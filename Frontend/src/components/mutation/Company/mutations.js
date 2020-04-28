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

export { addCompanyMutation };
