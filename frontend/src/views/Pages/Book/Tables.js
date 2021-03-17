import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from "reactstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlAlldata } from "../../../Constant";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      currentPage: 1,
      resultsPerPage: 40,
      show: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  componentDidMount() {
    axios({
      method: "get",
      url: urlAlldata,
    })
      .then((data) => {
        this.setState({
          results: data.data.response,
          loading: true,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }

  filterList = (event) => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  infoDetails = (result) => {
    this.setState({
      show: true,
      judul_buku: result.judul_buku,
      foto: result.foto,
      penulis: result.penulis,
      tahun_terbit: result.tahun_terbit,
      penerbit: result.penerbit,
      jenis: result.jenis,
      jumlah: result.jumlah,
      pemilik: result.nama,
      no_telepon: result.no_telepon,
      asal: result.asal,
    });
  };

  render() {
    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderresults = currentresults.map((results, index) => {
      return (
        <tr key={results.id_buku} data-category={results.id_buku}>
          <td>{results.judul_buku}</td>
          <td>{results.penulis}</td>
          <td>{results.tahun_terbit}</td>
          <td>{results.penerbit}</td>
          <td>{results.jenis}</td>
          <td>{results.jumlah}</td>
          <td>
            <img
              src={results.foto}
              alt={results.foto}
              style={{ maxHeight: "150px" }}
            />
          </td>
          <td>{results.nama}</td>
          <td>
            <Button
              className="btn btn-info"
              onClick={() => this.infoDetails(results)}
            >
              Details
            </Button>
          </td>
        </tr>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(results.length / resultsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
          className="page-link"
        >
          {number}
        </li>
      );
    });

    if (this.state.loading === false) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        {/* modal details buku*/}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>DETAILS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
              <img
                src={this.state.foto}
                alt={this.state.foto}
                style={{ maxHeight: "150px" }}
              />
            </center>
            <br />
            <table responsive striped>
              <thead></thead>
              <tbody>
                <tr>
                  <td>Judul</td>
                  <td>:</td>
                  <td>{this.state.judul_buku}</td>
                </tr>

                <tr>
                  <td>Penulis</td>
                  <td>:</td>
                  <td>{this.state.penulis}</td>
                </tr>

                <tr>
                  <td>Tahun Terbit</td>
                  <td>:</td>
                  <td>{this.state.tahun_terbit}</td>
                </tr>

                <tr>
                  <td>Penerbit</td>
                  <td>:</td>
                  <td>{this.state.penerbit}</td>
                </tr>

                <tr>
                  <td>Jenis</td>
                  <td>:</td>
                  <td>{this.state.jenis}</td>
                </tr>

                <tr>
                  <td>Jumlah</td>
                  <td>:</td>
                  <td>{this.state.jumlah}</td>
                </tr>

                <tr>
                  <td>Pemilik</td>
                  <td>:</td>
                  <td>{this.state.pemilik}</td>
                </tr>

                <tr>
                  <td>No Telepon</td>
                  <td>:</td>
                  <td>{this.state.no_telepon}</td>
                </tr>

                <tr>
                  <td>Alamat</td>
                  <td>:</td>
                  <td>{this.state.asal}</td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-secondary" onClick={this.handleClose}>
              Close
            </Button>
            <a href={"https://wa.me/" + this.state.no_telepon}>
              {" "}
              <Button
                className="btn btn-info"
                style={{ backgroundColor: "green" }}
              >
                Hubungi Pemilik{" "}
                <img
                  alt="whatsapp"
                  src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png"
                  style={{ maxHeight: "25px" }}
                />
              </Button>
            </a>
          </Modal.Footer>
        </Modal>

        <div className="row"></div>

        <div className="animated fadeIn">
          {this.state.loading && (
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <i className="fa fa-user" /> <b>&nbsp;LIST All BOOKS</b>
                      </Col>
                      <Col>
                        <input
                          type="text"
                          id="myInput"
                          className="form-control form-control-md"
                          style={{ width: "100%" }}
                          placeholder="Search By Judul Buku"
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
                          <th>Pemilik</th>
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
