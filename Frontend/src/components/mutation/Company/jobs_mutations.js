import { gql } from "apollo-boost";

const createCompanyJobPostMutation = gql`
  mutation(
    $company_id: ID
    $title: String
    $deadlinemonth: Int
    $deadlineday: Int
    $deadlineyear: Int
    $deadlinetime: String
    $deadlinedaytime: String
    $location: String
    $salary: String
    $salarytime: String
    $description: String
    $category: String
    $postingmonth: Int
    $postingday: Int
    $postingyear: Int
  ) {
    createCompanyNewJob(
      company_id: $company_id
      title: $title
      deadlinemonth: $deadlinemonth
      deadlineday: $deadlineday
      deadlineyear: $deadlineyear
      deadlinetime: $deadlinetime
      deadlinedaytime: $deadlinedaytime
      location: $location
      salary: $salary
      salarytime: $salarytime
      description: $description
      category: $category
      postingmonth: $postingmonth
      postingday: $postingday
      postingyear: $postingyear
    ) {
      _id
    }
  }
`;

const deleteCompanyJobPostMutation = gql`
  mutation($id: ID) {
    deleteCompanyJob(id: $id) {
      _id
    }
  }
`;

export { createCompanyJobPostMutation, deleteCompanyJobPostMutation };
