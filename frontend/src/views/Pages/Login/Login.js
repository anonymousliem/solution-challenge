import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CardImg, CardText } from 'reactstrap';
import Logo from '../../../assets/img/brand/eworkplace3.svg'
import axios from 'axios'
import {urlLogin, urlMe} from '../../../Constant'
class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username : '',
      password : '',
      logged : false,
      messageErrorPassword : '',
      messageErrorUsername : '',
      url : urlLogin
    }
  }

  handleUsername = (e) => {
    var values = e.target.value;
    if(values !== ""){
      this.setState({
        messageErrorUsername : ''
      })
    }

    this.setState({
      username : e.target.value
    })

  }

  
  handlePassword = (e) => {
    var valuesPassword = e.target.value;
    if(valuesPassword !== ""){
      this.setState({
        messageErrorPassword : ''
      })
    }
    this.setState({
      password : e.target.value
    })
  }

  onHandleSubmit = () => {
    var username = this.state.username;
    var password = this.state.password;
    if((username !== null && username !== "" ) && ( password !== null && password !== "") ){
      const Header = {
        accept: 'application/json',
        'Content-Type' : 'application/json-patch+json'
      }
    
      const Data = {
        username : this.state.username,
        password : this.state.password,
      }
  
      axios({
        method: 'post',
        url: this.state.url,
        headers: Header,
        data: Data,
      }).then(data => {
        console.log(data.data)
        var token = data.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("logged", true);
        this.setState({
          logged : true
        })
       // window.location.href = '/';  
       //this.props.history.push('/absensi/listallabsen')
      })
      .then(data => {
        const value = localStorage.getItem('token');

        const Headers = {
          'accept' : 'application/json',
          'Authorization' : `Bearer ` + value,
        }
        axios({
          method: 'get',
          url: urlMe,
          headers: Headers,
        }).then(data => {
          var RoleId = data.data.data.permission.app;
          //var token = data.data.data;
          if(RoleId !== null && RoleId !== undefined){
            localStorage.setItem("RoleId", RoleId);
          }
        })
        .then(data => {
          if(localStorage.getItem('RoleId') == 99){
            this.props.history.push('/absensi/listallabsen')
          }
          else{
            alert('Maap Anda Tidak Punya Akses Kesini')
          }
        })
        .catch(err => {
          console.log('errornya : ' + err)
        })
      })
      .catch(err => {
        alert("username atau password tidak ditemukan")
        });
    }

    if(username === null || username === ""){
      this.setState({
      messageErrorUsername : 'Username Tidak Boleh Kosong'
      })
   }

   if(password === null || password === ""){
    
    this.setState({
      messageErrorPassword : 'Password tidak boleh kosong'
    })
 }
     
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" required onChange={this.handleUsername} placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <font color="red">{this.state.messageErrorUsername}</font>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" onChange={this.handlePassword} placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <font color="red">{this.state.messageErrorPassword}</font>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.onHandleSubmit}>Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card body className="justify-content-center" style={{ width: '44%', backgroundColor: '#1A446D', }}>
                <CardImg src={Logo} alt="Logo" style={{padding:'auto'}}  />
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
