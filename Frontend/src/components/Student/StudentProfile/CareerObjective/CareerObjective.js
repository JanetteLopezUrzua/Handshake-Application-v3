import React from "react";
import DisplayObjective from "./DisplayObjective";
import EditObjective from "./EditObjective";
import { graphql, compose } from "react-apollo";
import { getStudentCareerObjectiveQuery } from "../../../queries/Student/auth_and_profile_queries";
import { updateStudentCareerObjectiveMutation } from "../../../mutation/Student/auth_and_profile_mutations";

class CareerObjective extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      objective: "",
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  objectiveChangeHandler = (e) => {
    this.setState({
      objective: e.target.value,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    let { id, objective } = this.state;

    try {
      let data = await this.props.updateStudentCareerObjectiveMutation({
        variables: {
          id: id,
          objective: objective.trim(),
        },
        refetchQueries: [
          {
            query: getStudentCareerObjectiveQuery,
            variables: { id: this.props.id },
          },
        ],
      });

      console.log(data);

      this.setState({ editWasTriggered: false });
    } catch (err) {
      console.log(err.message);
    }
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      editWasTriggered: false,
    });
  };

  render() {
    let data = this.props.data;
    console.log(data);

    let objective = null;
    if (!data.loading) {
      objective = this.props.data.student.objective;
    }

    const { editWasTriggered } = this.state;

    let display = "";
    display = (
      <DisplayObjective
        id={this.state.id}
        clicked={this.handleClick}
        objective={objective}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditObjective
          objectivechange={this.objectiveChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          data={this.state}
        />
      );
    }

    return <>{display}</>;
  }
}

export default compose(
  graphql(getStudentCareerObjectiveQuery, {
    options: (props) => ({ variables: { id: props.id } }),
  }),
  graphql(updateStudentCareerObjectiveMutation, {
    name: "updateStudentCareerObjectiveMutation",
  })
)(CareerObjective);
