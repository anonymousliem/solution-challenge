import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Button
} from 'reactstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import {urlAbsen, urlBlob, stateHeadDivision, appovedList, stateList, urlUser} from '../../../Constant'
const moment = require('moment');
class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      url: urlUser,
      currentPage: 1,
      resultsPerPage: 40,
      username: '',
      hasil: null,
      belomabsen: null,
      token: '',
      obj: [],
      show : false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleDetails = (IdAccount) => {
    this.setState({
      show : true
    })

    var token = localStorage.getItem('token');
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + token,
      'Content-Type': 'application/json-patch+json',
    };

    axios({
      method: 'get',
      url: this.state.url + '/' + IdAccount,
      headers: Header,
    })
      .then(data => {
        console.log(data.data.data.roles[0])
        this.setState({
          jobstitleName : data.data.data.roles[0].permissions[0].jobTitle.Name,
        divisionsName : data.data.data.roles[0].permissions[0].jobTitle.Division.Name,
        rolesId : data.data.data.roles[0].permissions[1].permission,
          RoleName : data.data.data.roles[0].name,

        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleClose = () => {
		this.setState({ show: false});
  }
  
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleGetUser = () => {
    var token = localStorage.getItem('token');
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + token,
      'Content-Type': 'application/json-patch+json',
    };

    axios({
      method: 'get',
      url: this.state.url + '?page=1&order=%7B%7D&filter=%7B%7D',
      headers: Header,
    })
      .then(data => {
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
        });
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
  }

  deleteAccount(EmployeeId) {
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: this.state.url + '/' + EmployeeId,
      headers: Header,
    })
      .then(data => {
        console.log(data);
        alert('berhasil dihapus');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  filterList = event => {
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
    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderresults = currentresults.map((results, index) => {

      return (
        
        <tr key={results._id} data-category={results._id}>
          <td>{results.username}</td>
          <td>{results.profile.firstname}</td>
          <td>{results.profile.lastname}</td>
          <td>{results.profile.gender}</td>
          <td>{moment(results.profile.dob).format('DD MMMM YYYY')}</td>
          <td>{results.profile.email}</td>
          <td>
            {/* <Button variant="info" onClick={() => this.props.editProduct(results._id)}>Edit</Button> */}
            {/* <Link
              to={'/account/editaccount/' + results._id}
              className="btn btn-primary">
              Edit
            </Link>
            &nbsp; */}
            <Button
              className="btn btn-info"
              onClick={() => this.handleDetails(results._id)}>
              Details
            </Button>
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
        <Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Details Account</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          
          <Form>
        
          Division Name
          <InputGroup className="mb-3">
          <Input type="text" autoComplete="Username" value={this.state.divisionsName} disabled />
          </InputGroup>
          
          Job Title Name
          <InputGroup className="mb-3">
          <Input type="text" value={this.state.jobstitleName} disabled />
          </InputGroup>
          
          Role Name
          <InputGroup className="mb-3">
          <Input type="text" autoComplete="Username" value={this.state.RoleName} disabled />
          </InputGroup>

          Permision 
          <InputGroup className="mb-3">
          <Input type="text" value={this.state.rolesId === 1 ||  this.state.rolesId === 99 ? 'Can Approve' : 'Cannot Approve'}  disabled/>
          </InputGroup>

          </Form>
          </Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
            </Button>
					</Modal.Footer>
				</Modal>

        <div className="animated fadeIn">
          {this.state.loading && (
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <i className="fa fa-user" /> <b>Account</b>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={() => {
                            window.location.href = '/#/account/addaccount';
                          }}>
                          Add Employee
                        </Button>
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
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Table id="myTable" responsive striped>
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>FirstName</th>
                          <th>LastName</th>
                          <th>Gender</th>
                          <th>DOB</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderresults}
                        {/* {values.map(function(object, i){
                      return <tr key={i}><td>{object}</td></tr>;
                      })} */}
                      </tbody>
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
