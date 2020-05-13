import React from "react";
import DisplayWork from "./DisplayWork";
import EditWork from "./EditWork";
import { graphql, compose } from "react-apollo";
import { getStudentJobsInfoQuery } from "../../../queries/Student/auth_and_profile_queries";
import {
  deleteStudentWorkInfoMutation,
  updateStudentWorkInfoMutation,
} from "../../../mutation/Student/auth_and_profile_mutations";

class WorkContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      jobid: "",
      job: {
        companyname: props.job.companyname,
        title: props.job.title,
        startdatemonth: props.job.startdatemonth,
        startdateyear: props.job.startdateyear,
        enddatemonth: props.job.enddatemonth,
        enddateyear: props.job.enddateyear,
        description: props.job.description,
      },
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({
    id: props.id,
    jobid: props.jobid,
  });

  handleClick = (e) => {
    e.preventDefault();

    this.setState({ editWasTriggered: true });
  };

  companyNameChangeHandler = (e) => {
    const job = { ...this.state.job };
    job.companyname = e.target.value;
    this.setState({
      job,
    });
  };

  titleChangeHandler = (e) => {
    const job = { ...this.state.job };
    job.title = e.target.value;
    this.setState({
      job,
    });
  };

  startDateMonthChangeHandler = (e) => {
    const job = { ...this.state.job };
    job.startdatemonth = e.target.value;
    this.setState({
      job,
    });
  };

  startDateYearChangeHandler = (e) => {
    const job = { ...this.state.job };
    job.startdateyear = e.target.value;
    this.setState({
      job,
    });
  };

  endDateMonthChangeHandler = (e) => {
    const job = { ...this.state.job };
    job.enddatemonth = e.target.value;
    this.setState({
      job,
    });
  };

  endDateYearChangeHandler = (e) => {
    const job = { ...this.state.job };
    job.enddateyear = e.target.value;
    this.setState({
      job,
    });
  };

  descriptionChangeHandler = (e) => {
    const job = { ...this.state.job };
    job.description = e.target.value;
    this.setState({
      job,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    const wspatt = new RegExp("^ *$");
    if (
      this.state.job.enddatemonth === "" ||
      wspatt.test(this.state.job.enddatemonth) ||
      this.state.job.enddatemonth === undefined ||
      this.state.job.enddateyear === "" ||
      wspatt.test(this.state.job.enddateyear) ||
      this.state.job.enddateyear === undefined
    ) {
      this.setState({
        errormessage: "Complete end date must be entered.",
      });
    } else if (this.state.job.startdateyear > this.state.job.enddateyear) {
      this.setState({
        errormessage: "End year can't be greater than start year.",
      });
    } else {
      try {
        await this.props.updateStudentWorkInfoMutation({
          variables: {
            id: this.state.id,
            jobid: this.state.jobid,
            startdatemonth: parseInt(this.state.job.startdatemonth),
            startdateyear: parseInt(this.state.job.startdateyear),
            enddatemonth: parseInt(this.state.job.enddatemonth),
            enddateyear: parseInt(this.state.job.enddateyear),
            description: parseInt(this.state.job.description),
          },
          refetchQueries: [
            {
              query: getStudentJobsInfoQuery,
              variables: { id: this.state.id },
            },
          ],
        });

        this.setState({
          editWasTriggered: false,
          errormessage: "",
        });
      } catch (err) {
        console.log(err.message);
        this.setState({
          job: "",
        });
      }
    }
  };

  handleCancel = () => {
    this.setState({
      job: this.props.job,
      editWasTriggered: false,
    });
  };

  handleDelete = async (e) => {
    e.preventDefault();
    const { id } = this.state;
    const { jobid } = this.state;

    try {
      await this.props.deleteStudentWorkInfoMutation({
        variables: {
          id: id,
          jobid: jobid,
        },
        refetchQueries: [
          {
            query: getStudentJobsInfoQuery,
            variables: { id: id },
          },
        ],
      });

      this.setState({
        editWasTriggered: false,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    let display = "";
    display = (
      <DisplayWork
        id={this.state.id}
        clicked={this.handleClick}
        job={this.state.job}
      />
    );

    if (this.state.editWasTriggered) {
      display = (
        <EditWork
          companynamechange={this.companyNameChangeHandler}
          titlechange={this.titleChangeHandler}
          startdatemonthchange={this.startDateMonthChangeHandler}
          startdateyearchange={this.startDateYearChangeHandler}
          enddatemonthchange={this.endDateMonthChangeHandler}
          enddateyearchange={this.endDateYearChangeHandler}
          descriptionchange={this.descriptionChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          job={this.state.job}
          delete={this.handleDelete}
          errormessage={this.state.errormessage}
        />
      );
    }

    return <>{display}</>;
  }
}

export default compose(
  graphql(getStudentJobsInfoQuery, {
    options: (props) => ({ variables: { id: props.id } }),
  }),
  graphql(deleteStudentWorkInfoMutation, {
    name: "deleteStudentWorkInfoMutation",
  }),
  graphql(updateStudentWorkInfoMutation, {
    name: "updateStudentWorkInfoMutation",
  })
)(WorkContainer);
