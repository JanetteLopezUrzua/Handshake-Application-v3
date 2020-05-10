import React from "react";
import DisplayJobInfo from "./DisplayJobInfo";
import { graphql, compose } from "react-apollo";
import { getCompanyJobQuery } from "../../../queries/Company/jobs_queries";

class JobInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      job_id: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ job_id: props.job_id });

  render() {
    let data = this.props.data;
    console.log(data);

    let title = "";
    let deadlinemonth = 0;
    let deadlineday = 0;
    let deadlineyear = 0;
    let deadlinetime = "";
    let deadlinedaytime = "";
    let location = "";
    let salary = "";
    let salarytime = "";
    let description = "";
    let category = "";
    let postingmonth = 0;
    let postingday = 0;
    let postingyear = 0;
    let company_id = "";
    let company_name = "";
    let company_photo = "";

    if (!data.loading) {
      title = data.job.title;
      deadlinemonth = data.job.deadlinemonth;
      deadlineday = data.job.deadlineday;
      deadlineyear = data.job.deadlineyear;
      deadlinetime = data.job.deadlinetime;
      deadlinedaytime = data.job.deadlinedaytime;
      location = data.job.location;
      salary = data.job.salary;
      salarytime = data.job.salarytime;
      description = data.job.description;
      category = data.job.category;
      postingmonth = data.job.postingmonth;
      postingday = data.job.postingday;
      postingyear = data.job.postingyear;
      company_id = data.job.companyid;
      company_name = data.job.companyname;
      company_photo = data.job.companyphoto;
    }

    let display = "";
    display = (
      <DisplayJobInfo
        company_id={company_id}
        job_id={this.state.job_id}
        clicked={this.handleClick}
        title={title}
        deadlinemonth={deadlinemonth}
        deadlineday={deadlineday}
        deadlineyear={deadlineyear}
        deadlinetime={deadlinetime}
        deadlinedaytime={deadlinedaytime}
        location={location}
        salary={salary}
        salarytime={salarytime}
        description={description}
        category={category}
        postingmonth={postingmonth}
        postingday={postingday}
        postingyear={postingyear}
        company_name={company_name}
        company_photo={company_photo}
      />
    );

    return <>{display}</>;
  }
}

export default compose(
  graphql(getCompanyJobQuery, {
    options: (props) => ({ variables: { id: props.job_id } }),
  })
)(JobInfo);
