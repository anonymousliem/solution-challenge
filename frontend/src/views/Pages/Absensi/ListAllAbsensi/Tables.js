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
import {urlAbsen, urlBlob, appovedList, stateList, urlUser} from '../../../../Constant'
//const $ = require('jquery');
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
      resultsPerPage: 40,
      rangePicker: {},
      show : false,
      step : 1,
      selectedOption: {},
      selectedOptionAdmin : {},
      selectedOptionState : {},
      selectedOptionHeadDivision : {},
      selectedOptionApprovalHeadDivision : {},
      showImage : false,
      stream : null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  onFileChangeImage = (e) =>{
    this.setState({ stream : e.target.files[0] })
  }

  handleUploadImage = (e) => {
    e.preventDefault();
    const Header = {

    }
    var formData = new FormData();
    formData.append("stream", this.state.stream, this.state.stream.name)
    axios.post(urlBlob, formData ,Header)
             .then(data => {
              this.setState({
                photo : data.data
              })
              alert("ulrnya : " + this.state.photo)
             }).then(
               
             )
             .catch(err => {
                console.log(err)
             })
  }
  /* handle untuk form */
  handelsubmitform = () => {
    if(this.state.stateApproveAdmin !== null && this.state.stateApproveAdmin !== "" && this.state.stateApproveAdmin !== undefined &&
    this.state.stateSelected !== null && this.state.stateSelected !== "" && this.state.stateSelected !== undefined){
      const Headers = {
        'accept' : 'application/json',
        'Authorization' : `Bearer ` + localStorage.getItem('token'),
        'Content-Type' : 'application/json-patch+json'
      };
      const Data = {
        "Name": this.state.Name,
        "Username": this.state.Username,
        "CheckIn": this.state.CheckIn,
        "State": this.state.stateSelected,
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
        method: 'post',
        url: this.state.url,
        headers: Headers,
        data : Data
      })
        .then(data => {
          console.log(data);
          alert("berhasil");
         window.location.reload();
        })
       
        .catch(err => {
          console.log(err);
        });
    }else
    {
      alert('Pastikan tidak ada kolom yang kosong')
    }
      
  }

  handleUsername = (evt) => {
     var a = evt.target.value
     if(a !== ""){
      this.setState ({
        Username : evt.target.value,
      });
    }
  }

  handleName = (evt) => {
    var b = evt.target.value
    if(b !== ""){
     this.setState ({
      Name : evt.target.value,
     });
   }
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
  if(d !== ""){
   this.setState ({
    Location : evt.target.value,
   });
  }
}

handleCheckOut = (evt) => {
  var e = evt.target.value
  if(e !== ""){
   this.setState ({
    CheckOut : moment(evt.target.value).add(0, 'hours'),
   });
  }
}

handlePhoto = (evt) => {
  var f = evt.target.value
  if(f !== ""){
   this.setState ({
    Photo : evt.target.value,
   });
  }
}

handleNote = (evt) => {
  var g = evt.target.value
  if(g !== ""){
   this.setState ({
    Note : evt.target.value,
   });
  }
}

handleProjectName = (evt) => {
  var h = evt.target.value
  if(h !== ""){
   this.setState ({
    ProjectName : evt.target.value,
   });
  }
}

handleCompanyName= (evt) => {
  var i = evt.target.value
  if(i !== ""){
   this.setState ({
    CompanyName : evt.target.value,
   });
  }
}

handleClientName= (evt) => {
  var j = evt.target.value
  if(j !== ""){
   this.setState ({
    ClientName : evt.target.value,
   });
  }
}


handleApprovalHeadDivision = selectedOptionApprovalHeadDivision => {
    if(selectedOptionApprovalHeadDivision.value !== null){
      this.setState({selectedOptionApprovalHeadDivision : selectedOptionApprovalHeadDivision , stateApproveHeadDivision : selectedOptionApprovalHeadDivision.value
      });
  };
}

  handleHeadDivision = selectedOptionHeadDivision => {
    if(selectedOptionHeadDivision.value !== null){
     this.setState({ selectedOptionHeadDivision : selectedOptionHeadDivision, selectedHeadDivision : selectedOptionHeadDivision.value});
    }
    
  };

  handleApproveAdmin = selectedOptionAdmin => {
    this.setState({ selectedOptionAdmin : selectedOptionAdmin, stateApproveAdmin : selectedOptionAdmin.value});
  }
  
  handleState = selectedOptionState => {
    if(selectedOptionState !== null){
    this.setState({ selectedOptionState : selectedOptionState, stateSelected : selectedOptionState.value});
  }
  }

  handleNext = () => {
    //alert(this.state.username)
    if(this.state.Username !== null && this.state.Username !== "" && this.state.Username !== undefined &&
      this.state.Name !== null && this.state.Name !== "" && this.state.Name !== undefined &&
      this.state.CheckIn !== null && this.state.CheckIn !== "" && this.state.CheckIn !== undefined &&
      this.state.Location !== null && this.state.Location !== "" && this.state.Location !== undefined &&
      this.state.stateApproveHeadDivision !== null && this.state.stateApproveHeadDivision !== "" && this.state.stateApproveHeadDivision !== undefined ){
      this.setState({
        step : this.state.step + 1
      })
    }else{
      alert('Selain kolom CheckOut tidak boleh kosong')
    }
    
  }

  
  handlePrevious = () => {
    this.setState({
      step : this.state.step - 1
    })
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
      url: this.state.url + '?SortByDate=1&page=1&size=25',
      headers: Header,
    })
      .then(data => {
        //console.log(data.data)
        this.setState({
          results: data.data,
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

  handleAddAbsensi = () => {
    this.setState({
      show : true
    })
  }

  handleAddImage = () => {
    this.setState({
      showImage : true
    })
  }

  handleClose = () => {
		this.setState({ show: false, showImage : false});
	}

	handleShow = () => {
		this.setState({ show: true });
  }

  handleSelect = range => {
    console.log(range);
    // An object with two keys,
    // 'startDate' and 'endDate' which are Momentjs objects.
  };

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
          <td>{results.CheckIn.substr(0, 10)}</td>
          <td>{moment(results.CheckIn).add(7, 'hours').format('hh:mm:ss a')}</td>
          <td>{results.State}</td>
          <td>{results.Location}</td>
          
          <td>
            {results.State === 'Sick Leave' ? 'Sick Leave' : (results.CheckOut === '0001-01-01T00:00:00'
              ? 'Haven\'t Checked Out Yet'
              : (moment(results.CheckOut).add(7, 'hours').format('hh:mm:ss a')))}
          </td>
         <td>
          <Button
              className="btn btn-danger"
              onClick={() => this.deleteAbsensi(results.Id)}>
              Delete
            </Button>
            </td>
          {/* <td>
            {results.checkIn.substr(11, 23) <= '09:00:00.000'
              ? 'aman'
              : 'telat'}
          </td> */}
          {/* <td>{Math.abs(new Date(post.checkIn) - new Date(post.checkOut))/3600000}</td> */}

          {/* <td>
            {results.checkOut.substr(11, 23) === '00:00:00'
              ? 'Haven\'t Checked Out Yet'
              : results.checkOut.substr(11, 23)}
          </td> */}

          {/* <td>{(Math.abs(new Date(post.checkIn) - new Date(post.checkOut))/3600000) == 9 ? 'tepat'  : ((Math.abs(new Date(post.checkIn) - new Date(post.checkOut))/3600000) < 9 ? 'kurang dari 9 jam' : 'lembur')}</td> */}
          {/* <td>
            {(
              Math.abs(new Date(results.checkIn) - new Date(results.checkOut)) /
              3600000
            )
              .toString()
              .substr(0, 3) === '176'
              ? 'Haven\'t Checked Out Yet'
              : (
                  Math.abs(
                    new Date(results.checkIn) - new Date(results.checkOut)
                  ) / 3600000
                )
                  .toString()
                  .substr(0, 3)}
          </td> */}

          {/* <td>
            {/* <Button variant="info" onClick={() => this.props.editProduct(results._id)}>Edit</Button> }
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
          </td> */}
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
						<Modal.Title>Add attendance</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          
          <Form>
          <div style={{display: this.state.step === 1 ? 'block' : 'none' }}>
          username
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleUsername} placeholder="Username" autoComplete="Username" />
          </InputGroup>
          
          Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleName} placeholder="Name" autoComplete="Name" />
          </InputGroup>
          
          CheckIn
          <InputGroup className="mb-3">
          <Input type="datetime-local" onChange={this.handleCheckIn}  />
          </InputGroup>

          Location
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleLocation} placeholder="Location"  />
          </InputGroup>
          
          CheckOut
          <InputGroup className="mb-3">
          <Input type="datetime-local" onChange={this.handleCheckOut}  />
          </InputGroup>

          Approval HeadDivision
          <Select 
                      name="form-field-name"
                      value={this.state.selectedOptionApprovalHeadDivision}
                      onChange={this.handleApprovalHeadDivision}
                      options={appovedList} /><br />
           <Button className="btn btn-warning" onClick={this.handleNext}>Next</Button>
          </div> 

          <div style={{display: this.state.step === 2 ? 'block' : 'none' }}>
          Approval Admin
          <Select style={{width:70}}
                      name="form-field-name"
                      value={this.state.selectedOptionAdmin}
                      onChange={this.handleApproveAdmin}
                      options={appovedList} />
          
          State
          <Select style={{width:70}}
                      name="form-field-name"
                      value={this.state.selectedOptionState}
                      onChange={this.handleState}
                      options={stateList} />
          
         <br />
  <div style={{display: this.state.selectedOptionState.value === "Work from home" ? 'block' : 'none' }}>
          Foto
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handlePhoto}  placeholder="url photo"/>
          </InputGroup>
          

          Note
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleNote}  placeholder="Catatan"/>
          </InputGroup>

          Project Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleProjectName}  placeholder="Project"/>
          </InputGroup>
          
          Head Division
          <Select style={{width:70}}
                      name="form-field-name"
                      value={this.state.selectedOptionHeadDivision}
                      onChange={this.handleHeadDivision}
                      options={stateHeadDivision} />
                      <br />
  </div>
<div style={{display: this.state.selectedOptionState.value === "Work at client" ?  'block' : 'none' }}>
          Foto
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handlePhoto}  placeholder="url photo"/>
          </InputGroup>
          
          Company Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleCompanyName}  placeholder="Company Name"/>
          </InputGroup>

          Client Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleClientName}  placeholder="Client Name"/>
          </InputGroup>

          Project Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleProjectName}  placeholder="Project"/>
          </InputGroup>
          
          Head Division
          <Select style={{width:70}}
                      name="form-field-name"
                      value={this.state.selectedOptionHeadDivision}
                      onChange={this.handleHeadDivision}
                      options={stateHeadDivision} />
                                  <br />
</div>

        <div style={{display: this.state.selectedOptionState.value === "Sick Leave" ? 'block' : 'none' }}>
          Project Name
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleProjectName}  placeholder="Project"/>
          </InputGroup>
          
          Head Division
          <Select style={{width:70}}
                      name="form-field-name"
                      value={this.state.selectedOptionHeadDivision}
                      onChange={this.handleHeadDivision}
                      options={stateHeadDivision} />

          Note
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleNote}  placeholder="Note"/>
          </InputGroup>
          <br />
          </div>

          <Button className="btn btn-warning" onClick={this.handlePrevious}>Previous</Button>
     
          </div>     
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

        {/*Modal Upload Image*/}
        <Modal show={this.state.showImage} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Upload Image</Modal.Title>
					</Modal.Header>
					<Modal.Body>
         <Form>
         <input type="file" name="stream" onChange={this.onFileChangeImage} multiple />
         
         </Form>
          </Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
            </Button>
						<Button className="btn btn-info" onClick={this.handleUploadImage}>
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
                        <i className="fa fa-user" /> <b>&nbsp;List All</b>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={this.handleAddAbsensi}>
                          Add attendance
                        </Button>

                        <Button
                          style={{ marginLeft: 10 }}
                          color="warning"
                          className="px-4"
                          onClick={this.handleAddImage}>
                          Upload Image
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
                          <th>Username</th>
                          <th>Name</th>
                          <th>Date</th>
                          <th>CheckIn</th>
                          <th>State</th>
                          <th>Location</th>
                          <th>CheckOut</th>
                          <th>Action</th>
                          {/* <th>Action</th> */}
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
