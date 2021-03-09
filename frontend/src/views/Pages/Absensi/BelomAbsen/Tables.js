import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {urlAbsen, urlBlob, stateHeadDivision, appovedList, stateList, urlUser} from '../../../../Constant'
const moment = require('moment');
class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      currentPage: 1,
      resultsPerPage: 10,
      username: '',
      hasil: null,
      belomabsen: null,
      token: '',
      obj: [],
      show : false,
      date : new Date().toISOString().slice(0,10),
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleBelomAbsen = () => {
    const Header = {
      accept: '*/*',
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };

    axios({
      method: 'get',
      url:  urlAbsen + '?CheckIn=' + this.state.date + '&SortByDate=1&page=1&size=25',
      headers: Header,
    })
      .then(data => {
        if(data !== null){
          var x;
          var belomabsen = [];
          var lengths = Object.keys(data.data).length;
          for (x = 0; x < lengths; x++) {
            belomabsen.push(data.data[x].Username);
          }
          this.setState({
            belomabsen: belomabsen,
            show : true
          });
          console.log(this.state.belomabsen)
        }
      })

      .catch(err => {
        console.log(err);
      });
  };

  handleGetUser = () => {
    var token = localStorage.getItem('token');
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + token,
      'Content-Type': 'application/json-patch+json',
    };

    axios({
      method: 'get',
      url: urlUser + '?page=1&size=25&order=%7B%7D&filter=%7B%7D',
      headers: Header,
    })
      .then(data => {
        if(data !== null ){
          var i;
          var hasil = [];
          var length = Object.keys(data.data.data).length;
          for (i = 0; i < length; i++) {
            hasil.push(data.data.data[i].username);
          }
          this.setState({
            results: data.data.data,
            loading: true,
            length: length,
            hasil: hasil,
            show : true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  componentDidMount() {
    const value = localStorage.getItem('token');
    this.setState({
      token: value,
    });
      this.handleGetUser();
      this.handleBelomAbsen();
  }


  filterList = event => {
    //var updatedList = this.state.results;
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  };

  render() {
    var listUser = this.state.hasil;
    var sudahAbsen = this.state.belomabsen;
    if (listUser !== null && sudahAbsen !== null) {
      var allbelomabsen = listUser.filter(function(n) {
        return !this.has(n);
      }, new Set(sudahAbsen));
      //var json = allbelomabsen.reduce((json, value, key) => { json[key] = value; return json; }, {});
      if(allbelomabsen !== null){
        var arrayToString = JSON.stringify(Object.assign({}, allbelomabsen)); // convert array to string
        if(arrayToString !== null){
          var stringToJsonObject = JSON.parse(arrayToString); // convert string to json object
          if(stringToJsonObject !== null){
            var values ={};
            var values = Object.values(stringToJsonObject);
          }
        }
      }
  }else{
    return <h2>Loading...</h2>;
  }
    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderresults = currentresults.map((results, index) => {
      return (
        <tr key={results._id} data-category={results._id}>
          <td>{results.username}</td>
          <td>{results.profile.firstname}</td>
          <td>{results.profile.email}</td>
          <td>
            {/* <Button variant="info" onClick={() => this.props.editProduct(results._id)}>Edit</Button> */}
            <Link
              to={'/account/editaccount/' + results._id}
              className="btn btn-primary">
              Edit
            </Link>
            &nbsp;
            <Button
              className="btn btn-danger"
              onClick={() => this.deleteAccount(results._id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(results.length / resultsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
          className="page-link">
          {number}
        </li>
      );
    });

    if (this.state.loading === false) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <div className="animated fadeIn">
          {this.state.loading && (
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <i className="fa fa-user" /> <b>Belom Absen  {moment(this.state.date).format("DD MMMM YYYY")}</b>
                      </Col>
                      <Col>
                        <input
                          type="text"
                          id="myInput"
                          className="form-control form-control-md"
                          style={{ width: '100%' }}
                          placeholder="Search By Username"
                          onChange={this.filterList}
                        />

                        {/* <input
                          type="date"
                          onChange={this.handeleDate}
                        /> */}

                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Table id="myTable" responsive striped>
                      <thead>
                        <tr>
                          <th>Username</th>
              
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.show && (values !== null ? values.map(function(object, i) {
                          return (
                            <tr key={i}>
                              <td>{object}</td>
                            
                            </tr>
                          );
                        }) : <h2>Loading</h2>
 )}                     </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </div>
        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Tables;
