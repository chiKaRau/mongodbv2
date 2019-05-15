import React, { Component } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table id="myTable" className="table table-dark">
        <TableHeader sorter={this.props.sorter} />
        <TableBody
          page={this.props.page}
          filterAry={this.props.filterAry}
          paginator={this.props.paginator}
        />
      </table>
    );
  }
}

export default Table;
