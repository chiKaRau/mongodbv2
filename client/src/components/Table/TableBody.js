import React, { Component } from "react";

class TableBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let filterAry = this.props.paginator(
      this.props.filterAry,
      this.props.page,
      this.props.showItem
    ).items_data;

    const displayJob = filterAry.map(job => {
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
    return <tbody>{displayJob}</tbody>;
  }
}

export default TableBody;
