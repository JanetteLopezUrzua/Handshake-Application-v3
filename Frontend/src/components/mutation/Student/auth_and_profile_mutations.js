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

const updateStudentContactInfoMutation = gql`
  mutation($id: ID, $email: String, $phonenumber: String) {
    updateStudentContactInfo(
      id: $id
      email: $email
      phonenumber: $phonenumber
    ) {
      _id
    }
  }
`;

const addStudentEducationInfoMutation = gql`
  mutation(
    $id: ID
    $name: String
    $primaryschool: String
    $location: String
    $degree: String
    $major: String
    $passingmonth: Int
    $passingyear: Int
    $gpa: String
  ) {
    addStudentEducationInfo(
      id: $id
      name: $name
      primaryschool: $primaryschool
      location: $location
      degree: $degree
      major: $major
      passingmonth: $passingmonth
      passingyear: $passingyear
      gpa: $gpa
    ) {
      _id
    }
  }
`;

const deleteStudentEducationInfoMutation = gql`
  mutation($id: ID, $schoolid: ID) {
    deleteStudentEducationInfo(id: $id, schoolid: $schoolid) {
      _id
    }
  }
`;

const updateStudentEducationInfoMutation = gql`
  mutation(
    $id: ID
    $schoolid: ID
    $location: String
    $degree: String
    $major: String
    $passingmonth: Int
    $passingyear: Int
    $gpa: String
  ) {
    updateStudentEducationInfo(
      id: $id
      schoolid: $schoolid
      location: $location
      degree: $degree
      major: $major
      passingmonth: $passingmonth
      passingyear: $passingyear
      gpa: $gpa
    ) {
      _id
    }
  }
`;

const addStudentWorkInfoMutation = gql`
  mutation(
    $id: ID
    $companyname: String
    $title: String
    $startdatemonth: Int
    $startdateyear: Int
    $enddatemonth: Int
    $enddateyear: Int
    $description: String
  ) {
    addStudentWorkInfo(
      id: $id
      companyname: $companyname
      title: $title
      startdatemonth: $startdatemonth
      startdateyear: $startdateyear
      enddatemonth: $enddatemonth
      enddateyear: $enddateyear
      description: $description
    ) {
      _id
    }
  }
`;

const deleteStudentWorkInfoMutation = gql`
  mutation($id: ID, $jobid: ID) {
    deleteStudentWorkInfo(id: $id, jobid: $jobid) {
      _id
    }
  }
`;

const updateStudentWorkInfoMutation = gql`
  mutation(
    $id: ID
    $jobid: ID
    $startdatemonth: Int
    $startdateyear: Int
    $enddatemonth: Int
    $enddateyear: Int
    $description: String
  ) {
    updateStudentWorkInfo(
      id: $id
      jobid: $jobid
      startdatemonth: $startdatemonth
      startdateyear: $startdateyear
      enddatemonth: $enddatemonth
      enddateyear: $enddateyear
      description: $description
    ) {
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
  updateStudentContactInfoMutation,
  addStudentEducationInfoMutation,
  deleteStudentEducationInfoMutation,
  updateStudentEducationInfoMutation,
  addStudentWorkInfoMutation,
  deleteStudentWorkInfoMutation,
  updateStudentWorkInfoMutation,
};
