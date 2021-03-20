import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, Input } from "reactstrap";
import { Form } from "react-bootstrap";
import { urlUser } from "../../../Constant";
import axios from "axios";

class FormMyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exist: true,
    };
  }

  handleNama = (e) => {
    this.setState({
      nama: e.target.value,
    });
  };

  handleAsal = (e) => {
    this.setState({
      asal: e.target.value,
    });
  };

  handleIdentitas = (e) => {
    this.setState({
      identitas: e.target.value,
    });
  };

  handleNoTelepon = (e) => {
    this.setState({
      no_telepon: e.target.value,
    });
  };

  handleFoto = (e) => {
    this.setState({
      photo: e.target.value,
    });
  };

  handleAddForm = () => {
    const Header = {
      "Content-Type": "application/json",
    };

    const Data = {
      asal: this.state.asal,
      id_user: sessionStorage.getItem("id_session"),
      identitas: this.state.identitas,
      nama: this.state.nama,
      no_telepon: this.state.no_telepon,
      photo: this.state.photo,
      status: "verified",
    };
    if (
      this.state.asal === null ||
      this.state.asal === "" ||
      this.state.identitas === null ||
      this.state.identitas === "" ||
      this.state.nama === null ||
      this.state.nama === "" ||
      this.state.no_telepon === null ||
      this.state.no_telepon === "" ||
      this.state.photo === null ||
      this.state.photo === ""
    ) {
      alert("tidak boleh ada data yang kosong");
    } else {
      axios({
        method: "POST",
        url: urlUser,
        data: Data,
        headers: Header,
      })
        .then((data) => {
          alert("berhasil ditambahkan");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleEditForm = () => {
    const Header = {
      "Content-Type": "application/json",
    };

    const Data = {
      asal: this.state.asal,
      id_user: sessionStorage.getItem("id_session"),
      identitas: this.state.identitas,
      nama: this.state.nama,
      no_telepon: this.state.no_telepon,
      photo: this.state.photo,
      status: "verified",
    };
    if (
      this.state.asal === null ||
      this.state.asal === "" ||
      this.state.identitas === null ||
      this.state.identitas === "" ||
      this.state.nama === null ||
      this.state.nama === "" ||
      this.state.no_telepon === null ||
      this.state.no_telepon === "" ||
      this.state.photo === null ||
      this.state.photo === ""
    ) {
      alert("tidak boleh ada data yang kosong");
    } else {
      axios({
        method: "put",
        url: urlUser + sessionStorage.getItem("id_session"),
        data: Data,
        headers: Header,
      })
        .then((data) => {
          alert("berhasil diubah");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    if (
      sessionStorage.getItem("token") === "" ||
      sessionStorage.getItem("token") === null ||
      sessionStorage.getItem("logged") === "" ||
      sessionStorage.getItem("logged") === null ||
      sessionStorage.getItem("id_session") === "" ||
      sessionStorage.getItem("id_session") === null
    ) {
      this.props.history.push("/login");
    }

    axios({
      method: "get",
      url: urlUser + sessionStorage.getItem("id_session"),
    })
      .then((data) => {
        if (data.data.response.length !== 0) {
          this.setState({
            asal: data.data.response[0].asal,
            id_user: data.data.response[0].id_user,
            identitas: data.data.response[0].identitas,
            nama: data.data.response[0].nama,
            no_telepon: data.data.response[0].no_telepon,
            photo: data.data.response[0].photo,
            status: data.data.response[0].status,
          });
        } else {
          this.setState({
            exist: false,
          });
        }

        this.setState({
          loading: true,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Form>
          Nama
          <InputGroup className="mb-3">
            <Input
              type="text"
              onChange={this.handleNama}
              placeholder={
                this.state.exist === true ? this.state.nama : "Your Name"
              }
            />
          </InputGroup>
          Asal
          <InputGroup className="mb-3">
            <Input
              type="text"
              onChange={this.handleAsal}
              placeholder={this.state.exist === true ? this.state.asal : "Asal"}
            />
          </InputGroup>
          Identitas
          <InputGroup className="mb-3">
            <Input
              type="text"
              onChange={this.handleIdentitas}
              placeholder={
                this.state.exist === true
                  ? this.state.identitas
                  : "No Identitas"
              }
            />
          </InputGroup>
          No Telepon
          <InputGroup className="mb-3">
            <Input
              type="number"
              onChange={this.handleNoTelepon}
              placeholder={
                this.state.exist === true
                  ? this.state.no_telepon
                  : "Phone Number (628XXXXXXXXX)"
              }
            />
          </InputGroup>
          Foto
          <InputGroup className="mb-3">
            <Input
              type="text"
              onChange={this.handleFoto}
              placeholder={
                this.state.exist === true ? this.state.photo : "URL Photo"
              }
            />
          </InputGroup>
        </Form>
        {this.state.exist === true ? (
          <Button className="btn btn-info" onClick={this.handleEditForm}>
            Save Changes
          </Button>
        ) : (
          <Button className="btn btn-info" onClick={this.handleAddForm}>
            Save Data
          </Button>
        )}
      </div>
    );
  }
}

export default FormMyAccount;
