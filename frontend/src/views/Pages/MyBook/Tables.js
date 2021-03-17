import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  InputGroup,
  Input,
} from "reactstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlBlob, urlMyBook, urlBook } from "../../../Constant";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      currentPage: 1,
      resultsPerPage: 40,
      show: false,
      showImage: false,
      file: null,
      showAddBook: false,
      judul_buku : '',
      penulis : '',
      tahun_terbit : '',
      penerbit : '',
      jenis : '',
      jumlah : '',
      foto : ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleJudul = (e) => {
      this.setState({
        judul_buku : e.target.value
      })
  }
  handlePenulis = (e) => {
    this.setState({
      penulis : e.target.value
    })
  }
  handleTahun = (e) => {
    this.setState({
      tahun_terbit : e.target.value
    })
  }
  handlePenerbit = (e) => {
    this.setState({
      penerbit : e.target.value
    })
  }
  handleJenis = (e) => {
    this.setState({
      jenis : e.target.value
    })
  }
  handleJumlah = (e) => {
    this.setState({
      jumlah : e.target.value
    })
  }
  handleFoto = (e) => {
    this.setState({
      foto : e.target.value
    })
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  onFileChangeImage = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleUploadImage = (e) => {
    e.preventDefault();
    const Header = {};
    var formData = new FormData();
    formData.append("file", this.state.file, this.state.file.name);
    axios
      .post(urlBlob, formData, Header)
      .then((data) => {
        this.setState({
          file: data.data,
        });
        alert("BERHASIL. URL FOTO : " + this.state.file.data);
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios({
      method: "get",
      url: urlMyBook + sessionStorage.getItem("id_session"),
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

  handleAddImage = () => {
    this.setState({
      showImage: true,
    });
  };

  handleAddBooks = () => {
    this.setState({
      showAddBook: true,
    });
  };

  handleClose = () => {
    this.setState({ show: false, showImage: false, showAddBook: false });
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

  handleDeleteBook = (result) => {
    axios({
      method: "delete",
      url: urlBook + result.id_buku,
    })
      .then((data) => {
        alert("berhasil dihapus");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmitBuku = () => {
    const Data = {
      "judul_buku" : this.state.judul_buku,
      "id_user" : sessionStorage.getItem("id_session"),
      "penulis" : this.state.penulis,
      "tahun_terbit" : this.state.tahun_terbit,
      "penerbit" : this.state.penerbit,
      "jenis" : this.state.jenis,
      "jumlah" : this.state.jumlah,
      "foto" : this.state.foto
  }


  if(this.state.judul_buku === null || this.state.judul_buku === "" ||
     this.state.penulis === null || this.state.penulis === "" ||
     this.state.tahun_terbit === null || this.state.tahun_terbit === "" ||
     this.state.penerbit === null || this.state.penerbit === "" ||
     this.state.jenis === null || this.state.jenis === "" ||
     this.state.jumlah === null || this.state.jumlah === "" ||
     this.state.foto === null || this.state.foto === ""
   ){
    alert("tidak boleh ada data yang kosong")
   }
   else{
    axios({
      method: "POST",
      url: urlBook,
      data : Data
    })
      .then((data) => {
        alert("berhasil ditambahkan");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
   }
   
  }
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
            </Button>{" "}
            <Button
              className="btn btn-warning"
              onClick={() => this.infoDetails(results)}
            >
              Edit
            </Button>{" "}
            <Button
              className="btn btn-danger"
              onClick={() => {
                const confirmBox = window.confirm(
                  "Do you really want to delete this book?"
                );
                if (confirmBox === true) {
                  this.handleDeleteBook(results);
                }
              }}
            >
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
        {/*Modal Add */}
        <Modal show={this.state.showAddBook} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Buku</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              Judul Buku
              <InputGroup className="mb-3">
                <Input
                  type="text"
                  onChange={this.handleJudul}
                  placeholder="Judul"
                />
              </InputGroup>
              Penulis
              <InputGroup className="mb-3">
                <Input
                  type="text"
                  onChange={this.handlePenulis}
                  placeholder="Penulis"
                />
              </InputGroup>
              Tahun Terbit
              <InputGroup className="mb-3">
                <Input
                  type="text"
                  onChange={this.handleTahun}
                  placeholder="Tahun Terbit"
                />
              </InputGroup>
              Penerbit
              <InputGroup className="mb-3">
                <Input
                  type="text"
                  onChange={this.handlePenerbit}
                  placeholder="Penerbit"
                />
              </InputGroup>
              Jenis
              <InputGroup className="mb-3">
                <Input
                  type="text"
                  onChange={this.handleJenis}
                  placeholder="Jenis"
                />
              </InputGroup>
              Jumlah
              <InputGroup className="mb-3">
                <Input
                  type="text"
                  onChange={this.handleJumlah}
                  placeholder="Jumlah"
                />
              </InputGroup>
              Foto
              <InputGroup className="mb-3">
                <Input
                  type="text"
                  onChange={this.handleFoto}
                  placeholder="Url Foto"
                />
              </InputGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button className="btn btn-info" onClick={this.handleSubmitBuku}>
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
              <input
                type="file"
                name="file"
                onChange={this.onFileChangeImage}
                multiple
              />
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
                        <i className="fa fa-user" /> <b>&nbsp;List All</b>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="primary"
                          className="px-4"
                          onClick={this.handleAddImage}
                        >
                          Upload Image
                        </Button>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={this.handleAddBooks}
                        >
                          Tambah Buku
                        </Button>
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
