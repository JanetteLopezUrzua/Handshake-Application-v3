import { gql } from "apollo-boost";

const applyMutation = gql`
  mutation($jobid: ID, $studentid: ID) {
    applyToJob(jobid: $jobid, studentid: $studentid) {
      _id
    }
  }
`;

export { applyMutation };
