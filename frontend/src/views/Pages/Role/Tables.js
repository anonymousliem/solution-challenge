import React, { Component} from 'react';
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
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import {urlJobtitle, urlDivision, urlBlob, urlRole, permisionRoleIdList} from '../../../Constant'
import { da } from 'date-fns/locale';
//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      listDivison : [],
      loading: false,
      url: urlRole,
      currentPage: 1,
      resultsPerPage: 40,
      rangePicker: {},
      show : false,
      selectedDivision :{},
      stream : null,
      listJobtitle : {},
      selectedRolePermisiion : {},
      showDetails : false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  /* handle untuk form */
  handelsubmitform = () => {
    const Headers = {
      'accept' : 'application/json',
      'Authorization' : `Bearer ` + localStorage.getItem('token'),
      'Content-Type' : 'application/json-patch+json'
    };

    axios({
      method: 'get',
      url: urlJobtitle + '/' + this.state.selectedDivision,
      headers: Headers,
     // data : Data
    })
      .then(data => {
         
          this.setState({
          divId : data.data.data.Division.Id,
          divCode : data.data.data.Division.Code,
          divModified : data.data.data.Division.LastModifiedUtc,
          divName : data.data.data.Division.Name,
          jobtitleId : data.data.data.Id,
          jobtitleCode : data.data.data.Code,
          jobtitleName : data.data.data.Name,
          jobtitleModified : data.data.data.LastModifiedUtc
        })
        // alert("berhasil");
       //window.location.reload();
      })
      .then(
        data => {
          if(this.state.listJobtitle !== null || this.state.listJobtitle === ""){
            const Data = {
              "code": this.state.Code,
              "name": this.state.Name,
              "description": this.state.Description,
              "permissions": [
                {
                  "jobTitle": {
                    "Division": {
                      "Id": this.state.divId,
                      "Code": this.state.divCode,
                      "LastModifiedUtc": this.state.divModified,
                      "Name": this.state.divName
                    },
                    "Id": this.state.jobtitleId,
                    "Code": this.state.jobtitleCode,
                    "Name": this.state.jobtitleName,
                    "LastModifiedUtc": this.state.jobtitleModified
                  },
                  "permission": this.state.selectedRoleId
                },
                {
                  "jobTitle": {
                    "Division": {
                      "Id": 100,
                      "Code": "App",
                      "LastModifiedUtc": this.state.divModified,
                      "Name": "Approval"
                    },
                    "Id": 100,
                    "Code": "app",
                    "Name": "Approval",
                    "LastModifiedUtc": this.state.jobtitleModified
                  },
                  "permission": this.state.selectedRoleId
                }
              ]
            }
            axios({
              method: 'post',
              url: urlRole,
              headers: Headers,
              data : Data
            })
              .then(data => {
                alert("berhasil");
               window.location.reload();
              })
              .catch(err => {
               alert("ERROR" + err)
              });    
          }
        }
      )
      .catch(err => {
       alert(err)
      });
      
     
  }

  handlePermisionRoleId = selectedRolePermisiion  =>{
    if(selectedRolePermisiion.value !== null){
      this.setState({
        selectedRolePermisiion : selectedRolePermisiion,
        selectedRoleId : selectedRolePermisiion.value
      })
    }
  }
  handleDivision = selectedivision => {
    if(selectedivision.value !== null){
     this.setState({ selectedivision : selectedivision, 
      selectedDivision : selectedivision.value
      });
    }
    
  };

  handleCode = (evt) => {
      this.setState ({
        Code : evt.target.value,
      });
    
  }

  handleName = (evt) => {
     this.setState ({
      Name : evt.target.value,
     });
 }

 handleDescription = (evt) => {
  this.setState ({
    Description : evt.target.value,
  });
}

  handleJS = () => {
   // function filterRows() {
    var from = $('#datefilterfrom').val();
    var to = $('#datefilterto').val();

    if (!from && !to) {
      // no value for from and to
      return;
    }

    from = from || '2020-02-25'; // default from to a old date if it is not set
    to = to || '2020-02-25';

    var dateFrom = moment(from);
    var dateTo = moment(to);

    $('#myTable tr').each(function(i, tr) {
      var val = $(tr)
        .find('td:nth-child(3)')
        .text();
      var dateVal = moment(val, 'YYYY/MM/DD');

      var visible = dateVal.isBetween(dateFrom, dateTo, null, []) ? '' : 'none'; // [] for inclusive
      $(tr).css('display', visible);

      console.log(dateVal);
    });

   // $('#datefilterfrom').on("change", filterRows);
   // $('#datefilterto').on("change", filterRows);
 // };
}
  componentDidMount() {
    this.handleGetDivision();
    //alert(urlBlob)
    const value = localStorage.getItem('token');
    this.setState({
      token: value,
    });
    const Header = {
      accept: 'application/json',
      Authorization : `Bearer ` + value,
      // 'Content-Type' : 'application/json-patch+json'
    };

    axios({
      method: 'get',
      url: this.state.url + '?page=1&size=25',
      headers: Header,
    })
      .then(data => {
        console.log(data.data.data)
        this.setState({
          results: data.data.data,
          loading: true,
        });
      })
     
      .catch(err => {
        console.log(err);
      });
  }

  handleDateChange = (event) =>{
    this.handleJS();
  }

  filterList = event => {
    //var updatedList = this.state.results;
    // updatedList = updatedList.filter(function(item){
    //   return item.toString().toLowerCase().search(
    //     event.target.value.toLowerCase()) !== -1;
    // });
    // this.setState({results: updatedList});
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[2];
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

  handleAddDivision = () => {
    this.setState({
      show : true
    })
  }


  handleClose = () => {
		this.setState({ show: false, showDetails : false});
	}

  handleGetDivision = () => {
    const value = localStorage.getItem('token');
    this.setState({
      token: value,
    });
    const Header = {
      accept: 'application/json',
      Authorization : `Bearer ` + value,
      // 'Content-Type' : 'application/json-patch+json'
    };

    axios({
      method: 'get',
      url: urlJobtitle + '?page=1&size=25',
      headers: Header,
    })
      .then(data => {
        console.log(data.data.data)
        this.setState({
          listDivison: data.data.data,
          //loading: true,
        });
      })
     
      .catch(err => {
        console.log(err);
      });
  }

  handleSelect = range => {
    console.log(range);
    // An object with two keys,
    // 'startDate' and 'endDate' which are Momentjs objects.
  };

  detailsRole(RoleId){
    const value = localStorage.getItem('token');
  
    const Header = {
      accept: 'application/json',
      Authorization : `Bearer ` + value,
      // 'Content-Type' : 'application/json-patch+json'
    };

    axios({
      method: 'get',
      url: urlRole + '/' + RoleId,
      headers: Header,
    })
      .then(data => {
        console.log(data.data.data)
        this.setState({
         // listDivison: data.data.data,
          //loading: true,
        });
      })
     
      .catch(err => {
        console.log(err);
      });
  }
  detailRole = (RoleId) =>{
    
    this.setState({
      showDetails : true
    })

    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'get',
      url: urlRole + '/' + RoleId,
      headers: Header,
    })
      .then(data => {
        console.log(data.data.data)
        this.setState({
        jobstitleName : data.data.data.permissions[0].jobTitle.Name,
        divisionsName : data.data.data.permissions[0].jobTitle.Division.Name,
        rolesId : data.data.data.permissions[1].permission
      })
      })
      .catch(err => {
        console.log(err);
      });

  }
  deleteRole(RoleId) {
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlRole + '/' + RoleId,
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
  
  render() {
    let options = this.state.listDivison.map(function (division) {
      return { value: division.Id, label: division.Name };
    })

    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
   const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderresults = currentresults.map((results, index) => {
      //return <li key={index}>{todo.username}</li>;

      return (
        <tr key={results._id} data-category={results._id}>
          <td>{results._id}</td>
          <td>{results.code}</td>
          <td>{results.name}</td>
      
         <td>   
          {/* <Button
              className="btn btn-info"
              onClick={() => this.detailsRole(results._id)}>
              Details
            </Button>
            &nbsp; */}
            <Button
              className="btn btn-info"
              onClick={() => this.detailRole(results._id)}>
              Details
            </Button>
          
          &nbsp;
          <Button
              className="btn btn-danger"
              onClick={() => this.deleteRole(results._id)}>
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
      {/*Modal buat detail */}
      <Modal show={this.state.showDetails} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Details Roles</Modal.Title>
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
          
          Permision
          <InputGroup className="mb-3">
          <Input type="text" value={this.state.rolesId  === 1 || this.state.rolesId  === 99 ? 'Can Approve' : 'Cannot Approve' }  disabled/>
          </InputGroup>

          </Form>
          </Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
            </Button>
					</Modal.Footer>
				</Modal>


            	<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add Roles</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          
          <Form>
        
          Code
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleCode} placeholder="Code" autoComplete="Username" />
          </InputGroup>
          
          Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleName} placeholder="Name" autoComplete="Name" />
          </InputGroup>
          
          Description
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleDescription} placeholder="Description" autoComplete="Name" />
          </InputGroup>

          Job Title
          <Select style={{width:70}}
                      name="form-field-name"
                      value={this.state.selectedivision}
                      onChange={this.handleDivision}
                      options={options} />

          Permission
          <Select style={{width:70}}
                      name="form-field-name"
                      value={this.state.selectedRolePermisiion}
                      onChange={this.handlePermisionRoleId}
                      options={permisionRoleIdList} />
          </Form>
          </Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
            </Button>
						<Button className="btn btn-info" onClick={this.handelsubmitform}>
							Save Changes
            </Button>
					</Modal.Footer>
				</Modal>


        
        <div className="row">
          {/* <div class="col-md-3">
            <h4>Date from</h4>
            <input
              type="date"
              class="form-control"
              id="datefilterfrom"
              data-date-split-input="true"
              onChange={this.handleDateChange}
            />
          </div> */}
          {/* <div class="col-md-3">
            <h4>Date to</h4>
            <input
              type="date"
              class="form-control"
              id="datefilterto"
              data-date-split-input="true"
            />
          </div> */}
          {/* <div>
            <h4>Date to</h4>
            <button onClick={this.handleJS}>filter date</button>
          </div> */}
        </div>

        <div className="animated fadeIn">
          {this.state.loading && (
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <i className="fa fa-user" /> <b>&nbsp;List Role</b>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={this.handleAddDivision}>
                          Add Role
                        </Button>

                  
                      </Col>
                      <Col>
                        <input
                          type="text"
                          id="myInput"
                          className="form-control form-control-md"
                          style={{ width: '100%' }}
                          placeholder="Search By Name"
                          onChange={this.filterList}
                        />
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* <DateRange
              format="DD/MM/YYYY"
              startDate={rangePicker["startDate"]}
              endDate={rangePicker["endDate"]}
              linkedCalendars={true}
              disableDaysBeforeToday={true}
              date={now => now}
              onInit={this.handleChange}
              onChange={this.handleChange} /> */}

                    <Table id="myTable" responsive striped>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Code</th>
                          <th>Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>{
                       renderresults
                        }</tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </div>
        {/* <Pagination>
                  <PaginationItem>
                  {renderPageNumbers}
                     </PaginationItem>
    </Pagination>
         */}
        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Tables;
