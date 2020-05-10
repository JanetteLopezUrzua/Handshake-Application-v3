import { gql } from "apollo-boost";

const getCompanyJobsListQuery = gql`
  query($id: ID) {
    jobs(id: $id) {
      _id
      title
      deadlinemonth
      deadlineday
      deadlineyear
      deadlinetime
      deadlinedaytime
      location
      salary
      salarytime
      description
      category
      postingmonth
      postingday
      postingyear
    }
  }
`;

export { getCompanyJobsListQuery };
