import React from "react";
import DisplayInfo from "./DisplayInfo";
import EditInfo from "./EditInfo";
import { graphql, compose } from "react-apollo";
import { getCompanyBasicInfoQuery } from "../../../queries/Company/auth_and_profile_queries";
import { updateCompanyBasicInfoMutation } from "../../../mutation/Company/auth_and_profile_mutations";

class BasicDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      location: "",
      description: "",
      editWasTriggered: false,
      errormessages: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  locationChangeHandler = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  descriptionChangeHandler = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    let { id, location, description } = this.state;

    try {
      let data = await this.props.updateCompanyBasicInfoMutation({
        variables: {
          id: id,
          location: location,
          description: description,
        },
        refetchQueries: [
          { query: getCompanyBasicInfoQuery, variables: { id: this.props.id } },
        ],
      });

      console.log(data);

      this.setState({ editWasTriggered: false });
    } catch (err) {
      console.log(err.message);
    }
  };

  handleCancel = () => {
    this.setState({ location: "", description: "", editWasTriggered: false });
  };

  render() {
    let data = this.props.data;
    console.log(data);

    let location = null;
    let description = null;
    if (!data.loading) {
      location = this.props.data.company.location;
      description = this.props.data.company.description;
    }

    const { editWasTriggered } = this.state;

    let display = "";
    display = (
      <DisplayInfo
        id={this.state.id}
        clicked={this.handleClick}
        location={location}
        description={description}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditInfo
          locationchange={this.locationChangeHandler}
          descriptionchange={this.descriptionChangeHandler}
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
  graphql(getCompanyBasicInfoQuery, {
    options: (props) => ({ variables: { id: props.id } }),
  }),
  graphql(updateCompanyBasicInfoMutation, {
    name: "updateCompanyBasicInfoMutation",
  })
)(BasicDetails);
