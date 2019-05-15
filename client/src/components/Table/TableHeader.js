import React, { Component } from "react";

class TableHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={() => this.props.sorter(0)}>Post Date</th>
          <th onClick={() => this.props.sorter(1)}>Company_Name</th>
          <th onClick={() => this.props.sorter(2)}>Address</th>
          <th onClick={() => this.props.sorter(3)}>Position</th>
          <th onClick={() => this.props.sorter(4)}>Salary</th>
          <th onClick={() => this.props.sorter(5)}>Contact Email</th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
