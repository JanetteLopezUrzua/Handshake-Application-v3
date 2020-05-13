import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import EducationContainer from "./EducationContainer";
import NewFormEducation from "./NewFormEducation";
import { graphql, compose } from "react-apollo";
import { getStudentSchoolsInfoQuery } from "../../../queries/Student/auth_and_profile_queries";
import {
  addStudentEducationInfoMutation,
  deleteStudentEducationInfoMutation,
} from "../../../mutation/Student/auth_and_profile_mutations";

class EducationDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      schools: [],
      newform: false,
      message: "",
      school: {
        schoolname: "",
        primaryschool: "",
        location: "",
        degree: "",
        major: "",
        passingmonth: "",
        passingyear: "",
        gpa: "",
      },
      errormessages: {},
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id });

  addSchool = (e) => {
    e.preventDefault();

    this.setState({
      newform: true,
    });
  };

  schoolNameChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.schoolname = e.target.value;
    this.setState({
      school,
    });
  };

  locationChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.location = e.target.value;
    this.setState({
      school,
    });
  };

  degreeChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.degree = e.target.value;
    this.setState({
      school,
    });
  };

  majorChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.major = e.target.value;
    this.setState({
      school,
    });
  };

  passingMonthChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.passingmonth = e.target.value;
    this.setState({
      school,
    });
  };

  passingYearChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.passingyear = e.target.value;
    this.setState({
      school,
    });
  };

  gpaChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.gpa = e.target.value;
    this.setState({
      school,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();
    const wspatt = new RegExp("^ *$");
    if (
      this.state.school.schoolname === "" ||
      wspatt.test(this.state.school.schoolname) ||
      this.state.school.schoolname === undefined
    ) {
      this.setState({
        errormessages: {
          schoolnameerror: "School name must be entered.",
        },
      });
    } else if (
      this.state.school.degree === "" ||
      wspatt.test(this.state.school.degree) ||
      this.state.school.degree === undefined
    ) {
      this.setState({
        errormessages: {
          degreeerror: "Degree must be selected.",
        },
      });
    } else if (
      this.state.school.passingmonth === "" ||
      wspatt.test(this.state.school.passingmonth) ||
      this.state.school.passingmonth === undefined ||
      this.state.school.passingyear === 0 ||
      this.state.school.passingyear === "" ||
      wspatt.test(this.state.school.passingyear) ||
      this.state.school.passingyear === undefined
    ) {
      this.setState({
        errormessages: {
          passingdateerror: "Complete end date must be selected.",
        },
      });
    } else {
      const name =
        this.state.school.schoolname === undefined
          ? null
          : this.state.school.schoolname;
      const loc =
        this.state.school.location === undefined
          ? null
          : this.state.school.location;
      const deg =
        this.state.school.degree === undefined
          ? null
          : this.state.school.degree;
      const maj =
        this.state.school.major === undefined ? null : this.state.school.major;
      const pm =
        this.state.school.passingmonth === undefined
          ? null
          : this.state.school.passingmonth;
      const py =
        this.state.school.passingyear === undefined
          ? null
          : this.state.school.passingyear;
      const gpascore =
        this.state.school.gpa === undefined ? null : this.state.school.gpa;

      const school = {
        schoolname: name,
        location: loc,
        degree: deg,
        major: maj,
        passingmonth: pm,
        passingyear: py,
        gpa: gpascore,
      };

      try {
        await this.props.addStudentEducationInfoMutation({
          variables: {
            id: this.state.id,
            name: name,
            primaryschool: "false",
            location: loc,
            degree: deg,
            major: maj,
            passingmonth: parseInt(pm),
            passingyear: parseInt(py),
            gpa: gpascore,
          },
          refetchQueries: [
            {
              query: getStudentSchoolsInfoQuery,
              variables: { id: this.state.id },
            },
          ],
        });

        this.setState({
          schools: [...this.state.schools, school],
          school: {
            schoolname: "",
            location: "",
            degree: "",
            major: "",
            passingmonth: "",
            passingyear: "",
            gpa: "",
          },
          errormessages: {
            schoolnameerror: "",
            degreeerror: "",
            passingdateerror: "",
          },
          newform: false,
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  handleCancel = () => {
    this.setState({
      school: {
        schoolname: "",
        location: "",
        degree: "",
        major: "",
        passingmonth: "",
        passingyear: "",
        gpa: "",
      },
      newform: false,
      errormessages: {
        schoolnameerror: "",
        degreeerror: "",
        passingdateerror: "",
      },
    });
  };

  handleDelete = async (schoolid) => {
    try {
      await this.props.deleteStudentEducationInfoMutation({
        variables: {
          id: this.state.id,
          schoolid: schoolid,
        },
        refetchQueries: [
          {
            query: getStudentSchoolsInfoQuery,
            variables: { id: this.state.id },
          },
        ],
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    let data = this.props.data;
    console.log(data);

    let message = null;
    let schools = null;
    if (!data.loading) {
      schools = data.student.schools;
    }

    if (schools === null || schools.length === 0) {
      message =
        "Where is somewhere you have studied? - Add your current school here so you can be found on the students list.";
    } else message = "";

    let schoolsList = "";
    let newschoolform = "";

    if (schools === null || schools.length === 0) schoolsList = "";
    else
      schoolsList = schools.map((school) => (
        <EducationContainer
          key={school._id}
          schoolid={school._id}
          id={this.state.id}
          school={school}
          delete={this.handleDelete}
        />
      ));

    if (this.state.newform === false) newschoolform = "";
    else {
      newschoolform = (
        <NewFormEducation
          school={this.state.school}
          schoolnamechange={this.schoolNameChangeHandler}
          locationchange={this.locationChangeHandler}
          degreechange={this.degreeChangeHandler}
          majorchange={this.majorChangeHandler}
          passingmonthchange={this.passingMonthChangeHandler}
          passingyearchange={this.passingYearChangeHandler}
          gpachange={this.gpaChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          errormessages={this.state.errormessages}
        />
      );
    }

    let button = "";
    if (
      localStorage.getItem("id") === this.state.id &&
      localStorage.getItem("type") === "Student"
    ) {
      button = (
        <Button onClick={this.addSchool} className="BottomAddButton">
          Add School
        </Button>
      );
    } else button = "";

    return (
      <Card style={{ padding: "0" }}>
        <Card.Title style={{ paddingLeft: "24px", paddingTop: "24px" }}>
          Education
        </Card.Title>
        <Form.Label style={{ color: "blue", padding: "0 24px" }}>
          {message}
        </Form.Label>
        <Container style={{ maxHeight: "800px", overflowY: "scroll" }}>
          {schoolsList}
          {newschoolform}
        </Container>
        <NavDropdown.Divider style={{ margin: "0" }}></NavDropdown.Divider>
        {button}
      </Card>
    );
  }
}

export default compose(
  graphql(getStudentSchoolsInfoQuery, {
    options: (props) => ({ variables: { id: props.id } }),
  }),
  graphql(addStudentEducationInfoMutation, {
    name: "addStudentEducationInfoMutation",
  }),
  graphql(deleteStudentEducationInfoMutation, {
    name: "deleteStudentEducationInfoMutation",
  })
)(EducationDetails);
