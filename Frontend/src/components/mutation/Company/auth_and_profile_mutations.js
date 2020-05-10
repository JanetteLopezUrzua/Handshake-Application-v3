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

const updateCompanyBasicInfoMutation = gql`
  mutation($id: ID, $location: String, $description: String) {
    updateCompanyBasicInfo(
      id: $id
      location: $location
      description: $description
    ) {
      _id
    }
  }
`;

const updateCompanyContactInfoMutation = gql`
  mutation($id: ID, $email: String, $phonenumber: String) {
    updateCompanyContactInfo(
      id: $id
      email: $email
      phonenumber: $phonenumber
    ) {
      _id
    }
  }
`;

const updateCompanyPictureInfoMutation = gql`
  mutation($id: ID, $photo: String) {
    updateCompanyPictureInfo(id: $id, photo: $photo) {
      _id
    }
  }
`;

const updateCompanyNameMutation = gql`
  mutation($id: ID, $name: String) {
    updateCompanyName(id: $id, name: $name) {
      _id
    }
  }
`;

const deleteCompanyPictureMutation = gql`
  mutation($id: ID) {
    deleteCompanyPicture(id: $id) {
      _id
    }
  }
`;

export {
  addCompanyMutation,
  loginCompanyMutation,
  updateCompanyBasicInfoMutation,
  updateCompanyContactInfoMutation,
  updateCompanyPictureInfoMutation,
  updateCompanyNameMutation,
  deleteCompanyPictureMutation,
};
