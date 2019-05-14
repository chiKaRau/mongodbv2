import React, { Component } from "react";
import "./Core.scss";
//import $ from "jquery";
//import { Form } from "react-bootstrap";
import axios from "axios";

class Core extends Component {
  state = {
    jobsAry: []
  };

  componentDidMount() {
    this.display();
  }

  display = () => {
    axios
      .post("/Display")
      .then(res => {
        //console.log(res.data);
        this.setState({
          jobsAry: res.data
        })
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    const displayJob = this.state.jobsAry.map(job => {
      let post_date = job.post_date;
      return (
        <tr key={job._id}>
          <th scope="row">{job._id + 1}</th>
          <td>{post_date.slice(0, 10)}</td>
          <td>{job.company_name}</td>
          <td>{job.address}</td>
          <td>{job.position}</td>
          <td>{job.salaray}</td>
          <td>{job.contactInfo}</td>
        </tr>
      );
    });
    return (
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Post Date</th>
            <th>Company_Name</th>
            <th>Address</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Contact Email</th>
          </tr>
        </thead>
        <tbody>{displayJob}</tbody>
      </table>
    );
  }
}

export default Core;
