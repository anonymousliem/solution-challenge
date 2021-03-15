import React, { Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from 'reactstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import {urlBlob, urlAlldata} from '../../../Constant'


class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      currentPage: 1,
      resultsPerPage: 40,
      show : false,
      showImage : false,
      file : null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  onFileChangeImage = (e) =>{
    this.setState({ file : e.target.files[0] })
  }

  handleUploadImage = (e) => {
    e.preventDefault();
    const Header = {

    }
    var formData = new FormData();
    formData.append("file", this.state.file, this.state.file.name)
    axios.post(urlBlob, formData ,Header)
             .then(data => {
              this.setState({
                file : data.data
              })
              alert(JSON.stringify(this.state.file))
             }).then(
               
             )
             .catch(err => {
                console.log(err)
             })
  }
  

componentDidMount() {
    axios({
        method: 'get',
        url : urlAlldata
    })
      .then(data => {
        this.setState({
          results: data.data.response,
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




  
  render() {
    
    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderresults = currentresults.map((results, index) => {
      //return <li key={index}>{todo.username}</li>;

      return (
        <tr key={results.id_buku} data-category={results.id_buku}>
          <td>{results.judul_buku}</td>
          <td>{results.penulis}</td>
          <td>{results.tahun_terbit}</td>
          <td>{results.penerbit}</td>
          <td>{results.jenis}</td>
          <td>{results.jumlah}</td>
          <td>
              <img src={results.foto} style={{maxHeight:'150px'}}/></td>
         <td>
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
            	  {/*Modal Upload Image*/}
        <Modal show={this.state.showImage} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Upload Image</Modal.Title>
					</Modal.Header>
					<Modal.Body>
         <Form>
         <input type="file" name="file" onChange={this.onFileChangeImage} multiple />
         
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


                    <Table id="myTable" responsive striped>
                      <thead>
                        <tr>
                          <th>Judul Buku</th>
                          <th>Penulis</th>
                          <th>Tahun Terbit</th>
                          <th>Penerbit</th>
                          <th>Jenis</th>
                          <th>Jumlah</th>
                          <th>Foto</th>
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

        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Tables;
