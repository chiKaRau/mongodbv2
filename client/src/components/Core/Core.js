import React, { Component } from "react";
import "./Core.scss";
//import $ from "jquery";
//import { Form } from "react-bootstrap";
import axios from "axios";
import Table from "../Table/Table.js";
import Input from "../Input/Input.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import RoutePage from "../Page/RoutePage.js";
import Page from "../Page/Page.js";

class Core extends Component {
  state = {
    jobsAry: [],
    filterAry: [],
    query: "",
    showItem: 10
  };

  componentDidMount() {
    this.display();
  }

  //unlike v1, this app would query all data at once at the beginning
  //and modifly them in client side
  display = () => {
    axios
      .post("/Display")
      .then(res => {
        //console.log(res.data);
        this.setState({
          jobsAry: res.data,
          filterAry: res.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  handleChange = evt => {
    evt.preventDefault();
    const { name, value, type } = evt.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.filter(this.state.query);
      }
    );
  };

  pageButtons = () => {
    let pageAry = [];
    let length = this.state.jobsAry.length / this.state.showItem;
    console.log(length);
    for (let i = 0; i < length; i++) {
      pageAry.push(
        <li key={i + 1} className="page-item">
          <Link className="page-link" to={`${i + 1}`}>
            {i + 1}
          </Link>
        </li>
      );
    }
    return pageAry;
  };

  filter = str => {
    let filterAry = this.state.jobsAry;
    if (str) {
      filterAry = filterAry.filter(ele => {
        return (
          ele.company_name.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.address.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.position.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.salaray.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.contactInfo.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.post_date.toLowerCase().indexOf(str.toLowerCase()) > -1
        );
      });
    } else {
      //if input box is empty, change back to original list
      filterAry = this.state.jobsAry;
    }
    this.setState({
      filterAry: filterAry
    });
  };

  sorter = n => {
    let table = document.getElementById("myTable"),
      rows,
      switching = true,
      i,
      x,
      y,
      shouldSwitch,
      dir = "asc",
      switchcount = 0;
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /*Loop through all table rows (except the
   first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) {
        //Change i=0 if you have the header th a separate table.
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
     one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
     based on the direction, asc or desc:*/
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
     and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
     set the direction to "desc" and run the while loop again.*/
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  };

  paginator(items, page, per_page) {
    //current user page
    page = page || 1;

    //total item shows per page
    per_page = per_page || 10;
    //specify which items should be slice off
    let offset = (page - 1) * per_page;
    //Ex, user is on page 2
    //per_page is 5
    //total item is 12
    //[1,2,3,4,5,6,7,8,9,10,11,12]
    //offset is 1 * 5 = 5
    //start do the slicing from the 5th position
    //first slice: [6,7,8,9,10,11,12]
    //second slice: [6,7,8,9,10]
    let paginatedItems = items.slice(offset).slice(0, per_page);

    //total pages need for item
    let total_pages = Math.ceil(items.length / per_page);
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total_items: items.length,
      total_pages: total_pages,
      items_data: paginatedItems
    };
  }

  render() {
    return (
      <Router>
        <Input handleChange={this.handleChange} query={this.state.query} />
        <Switch>
          {/*<Table sorter={this.sorter} filterAry={this.state.filterAry} />*/}
          <Route
            exact
            path="/"
            render={props => (
              <Page
                sorter={this.sorter}
                filterAry={this.state.filterAry}
                paginator={this.paginator}
                {...props}
              />
            )}
          />
          <Route
            path="/:number"
            render={props => (
              <Page
                sorter={this.sorter}
                filterAry={this.state.filterAry}
                paginator={this.paginator}
                {...props}
              />
            )}
          />
        </Switch>
        <nav aria-label="Page navigation example">
          <ul className="pagination">{this.pageButtons()}</ul>
        </nav>
      </Router>
    );
  }
}

export default Core;
