import React, { Component} from 'react';
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

//import moment from 'moment'
import {urlAbsen} from '../../../../Constant'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      idAbsensi : '',
      url: urlAbsen,
      currentPage: 1,
      resultsPerPage: 40,
      rangePicker: {},
      hasil : [],
      show : false,
      showDecline : false,
      idAbsensi : ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /* Handle untuk form*/
  handleClose = () => {
		this.setState({ show: false, showDecline : false});
	}

	handleShow = () => {
		this.setState({ show: true});
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
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
      url: this.state.url + '?Approval=Approved&NotState=Work%20at%20Office&ApprovalByAdmin=Pending&SortByDate=1&page=1&size=25',
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

  UpdateAbsensi(AbsensiId){
    this.setState({
      idAbsensi : AbsensiId
    })
    //alert(AbsensiId)
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
          this.setState({
            show : true,
            Name: data.data.Name,
            Username: data.data.Username,
            CheckIn: data.data.CheckIn,
            State: data.data.State,
            Location: data.data.Location,
            CheckOut: data.data.CheckOut,
            Approval: data.data.Approval,
            Photo: data.data.Photo,
            Note: data.data.Note,
            ProjectName: data.data.ProjectName,
            HeadDivision: data.data.HeadDivision,
            ApprovalByAdmin: data.data.ApprovalByAdmin,
            CompanyName: data.data.CompanyName,
            ClientName: data.data.ClientName,
          });
        })
        .catch(err => {
          console.log(err);
        });
  }
  handleDecline = () => {
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
      "Approval": this.state.Approval,
      "Photo": this.state.Photo,
      "Note": this.state.Note,
      "ProjectName": this.state.ProjectName,
      "HeadDivision": this.state.HeadDivision,
      "ApprovalByAdmin": "Decline",
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

  handleApproved = () =>{
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
      "Approval": this.state.Approval,
      "Photo": this.state.Photo,
      "Note": this.state.Note,
      "ProjectName": this.state.ProjectName,
      "HeadDivision": this.state.HeadDivision,
      "ApprovalByAdmin": "Approved",
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

  DeclineAbsensi(AbsensiId) {
    this.setState({
      idAbsensi : AbsensiId,
      showDecline : true
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
        this.setState({
          "Name": data.data.Name,
          "Username": data.data.Username,
          "CheckIn": data.data.CheckIn,
          "State": data.data.State,
          "Location": data.data.Location,
          "CheckOut": data.data.CheckOut,
          "Approval": data.data.Approval,
          "Photo": data.data.Photo,
          "Note": data.data.Note,
          "ProjectName": data.data.ProjectName,
          "HeadDivision": data.data.HeadDivision,
          "ApprovalByAdmin": data.data.ApprovalByAdmin,
          "CompanyName": data.data.CompanyName,
          "ClientName": data.data.ClientName,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }



  handleDateChange = (event) =>{
    //alert(event.target.value)
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
      td = tr[i].getElementsByTagName('td')[1];
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

  handleSelect = range => {
    console.log(range);
    // An object with two keys,
    // 'startDate' and 'endDate' which are Momentjs objects.
  };
  render() {
  
    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderresults = currentresults.map((results, index) => {
      //return <li key={index}>{todo.username}</li>;

      return (
        <tr key={results.Id} data-category={results.Id}>
         {/* <td>{results.Id}</td> */}
          <td>{results.Username}</td>
          <td>{results.Name}</td>
          <td>{results.CheckIn.substr(0,10)}</td>
          <td>{ (moment(results.CheckIn).add(7, 'hours').format('hh:mm:ss a'))
          //.substr(11, 23)
          }</td>
          {/* <td>
            {results.checkIn.substr(11, 23) <= '09:00:00.000'
              ? 'aman'
              : 'telat'}
          </td> */}
          {/* <td>{Math.abs(new Date(post.checkIn) - new Date(post.checkOut))/3600000}</td> */}
          <td>{results.State}</td>
          <td>{results.Location}</td>
          
          <td>
            {results.State === 'Sick Leave' ? 'Sick Leave' : (results.CheckOut === '0001-01-01T00:00:00'
              ? 'Haven\'t Checked Out Yet'
              : (moment(results.CheckOut).add(7, 'hours').format('hh:mm:ss a')))}
          </td>
          <td>{results.ApprovalByAdmin}</td>
          {/* <td>{(Math.abs(new Date(post.checkIn) - new Date(post.checkOut))/3600000) == 9 ? 'tepat'  : ((Math.abs(new Date(post.checkIn) - new Date(post.checkOut))/3600000) < 9 ? 'kurang dari 9 jam' : 'lembur')}</td> */}
          {/* <td>
            {(
              Math.abs(new Date(results.checkIn) - new Date(results.checkOut)) /
              3600000
            )
              .toString()
              .substr(0, 3) === '176'
              ? 'Haven't Checked Out Yet'
              : (
                  Math.abs(
                    new Date(results.checkIn) - new Date(results.checkOut)
                  ) / 3600000
                )
                  .toString()
                  .substr(0, 3)}
          </td> */}

           <td>
            {/* <Button className="brn btn-success" onClick={() => this.approveAbsensi(results.Id)}>Approve</Button>
            &nbsp; */}
            <Button
              className="btn btn-info"
              onClick={() => this.UpdateAbsensi(results.Id)}>
              Approve
            </Button>
            {/* <Link
              to={'/account/editaccount/' + results.id}
              className="btn btn-primary">
              Edit
            </Link> */}
            &nbsp;
            <Button
              className="btn btn-danger"
              onClick={() => this.DeclineAbsensi(results.Id)}>
              Decline
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
       <Modal show={this.state.showDecline} onHide={this.handleClose}>
      <Modal.Header>
						<Modal.Title>Approve</Modal.Title>
			</Modal.Header>
      <Modal.Body>
      <center>
        Apakah Anda yakin ingin mengubah status menjadi Decline??
      </center>
      </Modal.Body>
      <Modal.Footer>
      
      <Button className="btn btn-info" onClick={this.handleClose}>
							Close
      </Button>
			
      <Button className="btn btn-success" onClick={this.handleDecline}>
							Decline
      </Button>
      </Modal.Footer>
      </Modal>

       <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header>
						<Modal.Title>Approve</Modal.Title>
			</Modal.Header>
      <Modal.Body>
      <center>
        Apakah Anda yakin ingin mengubah status menjadi Approved??
      </center>
      </Modal.Body>
      <Modal.Footer>
      
      <Button className="btn btn-info" onClick={this.handleClose}>
							Close
      </Button>
			
      <Button className="btn btn-success" onClick={this.handleApproved}>
							Approved
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
                        <i className="fa fa-user" /> <b>&nbsp;Approval</b>
                        {/* <Button
                          style={{ marginLeft: 10 }}
                          className="btn btn-info"
                          onClick={this.handleAddAbsensi} >
                          Add Absensi
                        </Button> */}
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
                    <Table id="myTable" responsive striped>
                      <thead>
                        <tr>
                        {/* <th>ID</th> */}
                        <th>Username</th>
                          <th>Name</th>
                          <th>Date</th>
                          <th>CheckIn</th>
                          <th>State</th>
                          <th>Location</th>
                          <th>CheckOut</th>
                          <th>Approval</th>
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
        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Tables;
