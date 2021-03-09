import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Form, Input, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import axios from 'axios';
import {urlAbsen, urlBlob, urlUser, appovedList, stateList }from '../../../../Constant'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
const moment = require('moment');


class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateHeadDivision : [],
      results: [],
      loading: false,
      url: urlAbsen,
      currentPage: 1,
      resultsPerPage: 100,
      show : false,
      selectedOptionHeadDivision : {},
      selectedOptionApprovalHeadDivision : {},
      selectedOptionAdmin : {},
      showImage : false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleShowImage = (urlImage) => {
    this.setState({
      showImage : true,
      urlPhoto : urlImage
    })
  }

  handleCompanyName= (evt) => {
    var i = evt.target.value

     this.setState ({
      CompanyName : evt.target.value,
     });
    
  }

  handleCheckIn = (evt) => {
    var c = evt.target.value
    if(c !== ""){
     this.setState ({
      CheckIn : moment(evt.target.value).add(0, 'hours'),
     });
    }
  }
  
  handleLocation = (evt) => {
    var d = evt.target.value
    
     this.setState ({
      Location : evt.target.value,
     });
    
  }

  handleCheckOut = (evt) => {
    var e = evt.target.value
    if(e !== ""){
     this.setState ({
      CheckOut : moment(evt.target.value).add(0, 'hours'),
     });
    }
  }
  
  handleApprovalHeadDivision = selectedOptionApprovalHeadDivision => {
    if(selectedOptionApprovalHeadDivision.value !== null){
      this.setState({selectedOptionApprovalHeadDivision : selectedOptionApprovalHeadDivision , stateApproveHeadDivision : selectedOptionApprovalHeadDivision.value
      });
  };
}

handleApproveAdmin = selectedOptionAdmin => {
  this.setState({ selectedOptionAdmin : selectedOptionAdmin, stateApproveAdmin : selectedOptionAdmin.value});
}

handlePhoto = (evt) => {
  var f = evt.target.value

   this.setState ({
    Photo : evt.target.value,
   });
  
}

handleClientName= (evt) => {
  var j = evt.target.value

   this.setState ({
    ClientName : evt.target.value,
   });
  
}



handleProjectName = (evt) => {
  var h = evt.target.value

   this.setState ({
    ProjectName : evt.target.value,
   });
  
}


handleHeadDivision = selectedOptionHeadDivision => {
  if(selectedOptionHeadDivision.value !== null){
   this.setState({ selectedOptionHeadDivision : selectedOptionHeadDivision, selectedHeadDivision : selectedOptionHeadDivision.value});
  }
  
};


  handleClose = () => {
		this.setState({ show: false, showImage : false });
	}

	handleShow = () => {
		this.setState({ show: true, showImage : true});
  }

  UpdateAbsensi(AbsensiId){
    this.setState({
      idAbsensi : AbsensiId,
      show : true
    })

    const Header = {
      accept: 'application/json',
      Authorization : `Bearer ` + localStorage.getItem('token'),
      // 'Content-Type' : 'application/json-patch+json'
    };

    axios({
      method: 'get',
      url: this.state.url + '/' + AbsensiId,
      headers: Header,
    })
      .then(data => {
        console.log(data.data.State)
        this.setState({
          "Name": data.data.Name,
          "Username": data.data.Username,
          "CheckIn": data.data.CheckIn,
          "State": data.data.State,
          "Location": data.data.Location,
          "CheckOut": data.data.CheckOut,
          "stateApproveHeadDivision": data.data.Approval,
          "Photo": data.data.Photo,
          "Note": data.data.Note,
          "ProjectName": data.data.ProjectName,
          "selectedHeadDivision": data.data.HeadDivision,
          "stateApproveAdmin": data.data.ApprovalByAdmin,
          "CompanyName": data.data.CompanyName,
          "ClientName": data.data.ClientName,
        });
      })
      .catch(err => {
        console.log(err);
      });
}

handelsubmitform = () => {
  const Headers = {
    'accept' : 'application/json',
    'Authorization' : `Bearer ` + localStorage.getItem('token'),
    'Content-Type' : 'application/json-patch+json'
  };
  const Data = {
    "Name": this.state.Name,
    "Username": this.state.Username,
    "CheckIn": this.state.CheckIn,
    "State": this.state.State,
    "Location": this.state.Location,
    "CheckOut": this.state.CheckOut,
    "Approval": this.state.stateApproveHeadDivision,
    "Photo": this.state.Photo,
    "Note": this.state.Note,
    "ProjectName": this.state.ProjectName,
    "HeadDivision": this.state.selectedHeadDivision,
    "ApprovalByAdmin": this.state.stateApproveAdmin,
    "CompanyName": this.state.CompanyName,
    "ClientName": this.state.ClientName,
  }

  axios({
    method: 'put',
    url: this.state.url + '/' + this.state.idAbsensi,
    headers: Headers,
    data : Data
  })
    .then(data => {
      console.log(data);
      alert('berhasil diubah');
      window.location.reload();
    })
   
    .catch(err => {
      console.log(err);
    });
}

  deleteAbsensi(AbsensiId) {
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: this.state.url + '/' + AbsensiId,
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

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }
  handleGetHeadDivision = () => {
    const value = localStorage.getItem('token');
    const Header = {
      accept: 'application/json',
      Authorization : `Bearer ` + value,
    };
  
    axios({
      method: 'get',
      url: urlUser + '?page=1&size=25&order=%7B%7D&filter=%7B%7D',
      headers: Header,
    })
      .then(data => {
       this.setState({
        stateHeadDivision : data.data.data
       })
      })
     
      .catch(err => {
        console.log(err);
      });
    
}

 
  componentDidMount() {
    this.handleGetHeadDivision();
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
      url: this.state.url + '?State=Work%20at%20client&SortByDate=1&page=1&size=25',
      headers: Header,
    })
      .then(data => {
        this.setState({
          results: data.data,
          loading: true,
        });
      })
      .catch(err => {
        console.log(err);
      });
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
    let stateHeadDivision = this.state.stateHeadDivision.map(function (division) {
      return { value: division.username, label: division.profile.firstname + " " + division.profile.lastname };
    })
    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderresults = currentresults.map((results, index) => {
      //return <li key={index}>{todo.username}</li>;
      return (
        <tr key={results.Id} data-category={results.Id}>
          <td>{results.Username}</td>
          <td>{results.Name}</td>
          <td>{results.CheckIn.substr(0,10)}</td>
          <td>{ (moment(results.CheckIn).add(7, 'hours').format('hh:mm:ss a'))}</td>
          <td>
            {results.CheckOut === '0001-01-01T00:00:00'
              ? 'Haven\'t Checked Out Yet'
              : (moment(results.CheckOut).add(7, 'hours').format('hh:mm:ss a'))}
          </td>
          {/* <td>
            {results.CheckIn.substr(11, 23) <= '09:00:00.000'
              ? 'aman'
              : 'telat'}
          </td> */}
          {/* <td>{Math.abs(new Date(post.checkIn) - new Date(post.checkOut))/3600000}</td> */}
          <td>{results.Location}</td>
          <td>{results.Approval}</td>
          <td>{results.ApprovalByAdmin}</td> 
          <td><Button onClick={() => this.handleShowImage(results.Photo)} >Link</Button></td> 
          <td>{results.CompanyName}</td> 
          <td>{results.ClientName}</td>
          <td>{results.ProjectName}</td>
          <td>{results.HeadDivision}</td> 
          {/* <td>{(Math.abs(new Date(post.checkIn) - new Date(post.checkOut))/3600000) === 9 ? 'tepat'  : ((Math.abs(new Date(post.checkIn) - new Date(post.checkOut))/3600000) < 9 ? 'kurang dari 9 jam' : 'lembur')}</td> */}
          {/* <td>
            {(Math.abs(new Date(results.checkIn) - new Date(results.checkOut)) /
              3600000).toString().substr(0,3) === '176' ? 'Haven\'t Checked Out Yet' : 
              (Math.abs(new Date(results.checkIn) - new Date(results.checkOut)) /
              3600000).toString().substr(0,3) }
          </td> */}
              
          <td>
          <Button
              className="btn btn-info"
              onClick={() => this.UpdateAbsensi(results.Id)}>
              Edit
        </Button>

            {/* <Link
              to={'/account/editaccount/' + results.idWFH}
              className="btn btn-primary">
              Approve
            </Link> */}
            &nbsp;
            &nbsp;
            <Button
              className="btn btn-danger"
              onClick={() => this.deleteAbsensi(results.Id)}>
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
      {/*Modal Image */}
       <Modal show={this.state.showImage} onHide={this.handleClose}>
      <Modal.Header>
						<Modal.Title>Image</Modal.Title>
			</Modal.Header>
      <Modal.Body>
      <center>
      <img src={this.state.urlPhoto} height="250px" />
      </center>
      </Modal.Body>
      <Modal.Footer>
      <Button className="btn btn-danger" onClick={this.handleClose}>
							Close
            </Button>
			
      </Modal.Footer>
      </Modal>

{/*Modal Edit */}
      <Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Status</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          <Form>
          CheckIn
          <InputGroup className="mb-3">
          <Input type="datetime-local" onChange={this.handleCheckIn}  />
          </InputGroup>

          Location
          <InputGroup className="mb-3">
          <Input type="text" value={this.state.Location} onChange={this.handleLocation} placeholder="Location"  />
          </InputGroup>
          
          CheckOut
          <InputGroup className="mb-3">
          <Input type="datetime-local" onChange={this.handleCheckOut}  />
          </InputGroup>

          Approval HeadDivision
          <Select 
                      name="form-field-name"
                      value={//this.state.Approval
                        this.state.selectedOptionApprovalHeadDivision
                        }
                      onChange={this.handleApprovalHeadDivision}
                      options={appovedList} /><br />
          
          Approval Admin
          <Select style={{width:70}}
                      name="form-field-name"
                      value={this.state.selectedOptionAdmin}
                      onChange={this.handleApproveAdmin}
                      options={appovedList} />

Foto
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handlePhoto} value={this.state.Photo} placeholder="url photo"/>
          </InputGroup>
          

          Company Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleCompanyName} value={this.state.CompanyName}  placeholder="Catatan"/>
          </InputGroup>

          Client Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleClientName} value={this.state.ClientName}  placeholder="Catatan"/>
          </InputGroup>

          Project Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleProjectName}  value={this.state.ProjectName} placeholder="Project"/>
          </InputGroup>
          
          Head Division
          <Select style={{width:70}}
                      name="form-field-name"
                      value={this.state.selectedOptionHeadDivision}
                      onChange={this.handleHeadDivision}
                      options={stateHeadDivision} />
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
        <div className="animated fadeIn">
          {this.state.loading && (
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <i className="fa fa-user" /> <b>&nbsp;Work At Client</b>
                        {/* <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={() => {
                            window.location.href = '/#/account/addaccount';
                          }}>
                          Add Employee
                        </Button> */}
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
                          <th>Name</th>
                          <th>DateAttendece</th>
                          <th>CheckIn</th>
                          <th>CheckOut</th>
                          <th>Location</th>
                          <th>Approve HD</th>
                          <th>Approve Admin</th>
                          <th>Foto</th>
                          <th>Company Name</th>
                          <th>Client Name</th>
                          <th>Project Name</th>
                          <th>Head Division</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>{renderresults}</tbody>
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
