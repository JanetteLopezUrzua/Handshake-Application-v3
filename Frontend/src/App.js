/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Firstscreen from "./components/Firstscreen";
import StudentSignup from "./components/Student/Signup";
import StudentLogin from "./components/Student/Login";
import StudentProfile from "./components/Student/StudentProfile/ProfilePage";
import CompanySignup from "./components/Company/Signup";
import CompanyLogin from "./components/Company/Login";
import CompanyProfile from "./components/Company/CompanyProfile/ProfilePage";
import StudentStudentsList from "./components/Student/StudentTab/StudentsPage";
import CompanyStudentsList from "./components/Company/StudentTab/StudentsPage";
import Navbar from "./components/Navigationbar";
import NewJob from "./components/Company/JobPostings/NewJobPosting/NewJobPosting";
import CompanyJobs from "./components/Company/JobPostings/JobsPage";
import Job from "./components/Company/JobPostings/JobContainer/JobContainer";
import JobsNavBar from "./components/Student/StudentJobs/JobsNavBar";
import JobsSearch from "./components/Student/StudentJobs/JobsSearch/JobsSearch";
import ApplicationsList from "./components/Student/StudentJobs/JobsApplications/ApplicationsPage";

// App Component
class App extends Component {
  constructor() {
    super();
    this.state = {
      photochange: false,
    };
  }

  handlephotochange = () => {
    this.setState((prevState) => ({ photochange: !prevState.photochange }));
  };

  render() {
    const JobsContainer = () => (
      <div>
        <JobsNavBar />
        <Switch>
          <Route exact path="/student/jobs/search" component={JobsSearch} />
          <Route
            exact
            path="/student/jobs/applications"
            component={ApplicationsList}
          />
        </Switch>
      </div>
    );

    const DefaultContainer = () => (
      <div>
        <Navbar photochange={this.state.photochange} />
        <Switch>
          <Route exact path="/job/:job_id" component={Job} />
          <Route exact path="/company/jobs/new" component={NewJob} />
          <Route exact path="/company/jobs" component={CompanyJobs} />
          <Route
            exact
            path="/student/students"
            component={StudentStudentsList}
          />
          <Route
            exact
            path="/company/students"
            component={CompanyStudentsList}
          />
          <Route
            exact
            path="/student/:id"
            render={(props) => (
              <StudentProfile
                {...props}
                handlephotochange={this.handlephotochange}
              />
            )}
          />
          <Route
            excat
            path="/company/:id"
            render={(props) => (
              <CompanyProfile
                {...props}
                handlephotochange={this.handlephotochange}
              />
            )}
          />
          <Route path="/student/jobs/" component={JobsContainer} />
        </Switch>
      </div>
    );

    return (
      // Use Browser Router to route to different pages
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Firstscreen} />
          <Route path="/student/signup" component={StudentSignup} />
          <Route path="/student/login" component={StudentLogin} />
          <Route path="/company/signup" component={CompanySignup} />
          <Route path="/company/login" component={CompanyLogin} />
          <Route component={DefaultContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}
// Export the App component so that it can be used in index.js
export default App;
