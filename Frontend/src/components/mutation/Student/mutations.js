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

const updateStudentPictureInfoMutation = gql`
  mutation($id: ID, $photo: String) {
    updateStudentPictureInfo(id: $id, photo: $photo) {
      _id
    }
  }
`;

const deleteStudentPictureMutation = gql`
  mutation($id: ID) {
    deleteStudentPicture(id: $id) {
      _id
    }
  }
`;

const updateStudentBasicInfoMutation = gql`
  mutation(
    $id: ID
    $fname: String
    $lname: String
    $dob: String
    $city: String
    $state: String
    $country: String
  ) {
    updateStudentBasicInfo(
      id: $id
      fname: $fname
      lname: $lname
      dob: $dob
      city: $city
      state: $state
      country: $country
    ) {
      _id
    }
  }
`;

const updateStudentCareerObjectiveMutation = gql`
  mutation($id: ID, $objective: String) {
    updateStudentCareerObjective(id: $id, objective: $objective) {
      _id
    }
  }
`;

export {
  addStudentMutation,
  loginStudentMutation,
  updateStudentPictureInfoMutation,
  deleteStudentPictureMutation,
  updateStudentBasicInfoMutation,
  updateStudentCareerObjectiveMutation,
};
