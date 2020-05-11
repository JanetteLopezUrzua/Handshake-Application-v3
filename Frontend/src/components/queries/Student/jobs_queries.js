import { gql } from "apollo-boost";

const getStudentJobsListQuery = gql`
  query($search: String) {
    jobsSearch(search: $search) {
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
      companyid
      companyname
      companyphoto
    }
  }
`;

export { getStudentJobsListQuery };
