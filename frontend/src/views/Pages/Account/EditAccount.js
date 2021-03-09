import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

class EditAccount extends Component {
      constructor(props){
          super(props);
          this.state={
            firstname : '',
            lastname : '',
            username  : '',
            email : '',
            password : '',
            dob : '',
            status : '',
            role : '',
            gender : '',
            step : 1,
            url : 'https://userabensiendpoint.azurewebsites.net/v1/accounts'
          }
      }
      componentDidMount = () => {
               
        const dateTime = new Date().toLocaleString();
        const value = localStorage.getItem("token");
        this.setState({
          token : value,
          dateTime : dateTime
        })

        var logged = localStorage.getItem("logged");
        if(logged === null ){
         // window.location.href = '/';  
         this.props.history.push('/login')
        }

        var id = this.props.match.params.id;

        const Header = {
            accept: 'application/json',
            Authorization : `Bearer ` + value,
          }
        axios({
          method: 'get',
          url: this.state.url + '/' + id,
          headers: Header,
        }).then(data => {
            console.log(data);
         this.setState({
             firstname : data.data.data.profile.firstname,
             lastname : data.data.data.profile.lastname,
             username : data.data.data.username,
             dob :  data.data.data.profile.dob,
             gender : data.data.data.profile.gender,
             email : data.data.data.profile.email,
             password : data.data.data.profile.password

         })
        }).catch(err => {
            console.log(err);
          });

     

      }

      onhandlePrevius = () => {
        this.setState({
          step : this.state.step -1
        })
       }

      onhandleNext = () =>{
        if(this.state.username === "" || this.state.username === null || this.state.password === null || this.state.password ==="" 
        ||  this.state.firstname === "" || this.state.firstname === null || this.state.lastname === null || this.state.lastname === ""
        || this.state.email ==="" || this.state.email === ""){
        alert("tidak boleh ada data yang kosong")
        }else{
        this.setState({
          step : this.state.step+1
        })
      }

      }

    onhandleSubmit = () => {
      const Header = {
        accept: 'application/json',
        Authorization : `Bearer ` + this.state.token,
        'Content-Type' : 'application/json-patch+json'
      }
    
      const Data = {
        username : this.state.username,
        password : this.state.password,
        isLocked : true,
        profile : {
          firstname : this.state.firstname,
          lastname : this.state.lastname,
          gender : this.state.gender,
          dob : this.state.dob,
          email : this.state.email
        },
        _deleted : true,
        _active : true,
        _createdDate : this.state.dateTime,
        _createdBy : 'string',
        _createAgent : 'string',
        _updatedDate : this.state.dateTime,
        _updatedBy : 'string',
        _updateAgent : 'string',
      }

    axios({
      method: 'post',
      url: this.state.url,
      headers: Header,
      data: Data,
    }).then(data => {
      this.setState({
          username : data.data.data.username
      })

      }).catch(err => {
        console.log(err);
      });

      
    }

    onChangeFirtsname = (e) => {
      this.setState({
        firstname : e.target.value
      })
    }

    onChangeLastname = (e) => {
      this.setState({
        lastname : e.target.value
      })
    }

    onChangeUsername = (e) => {
      this.setState({
        username : e.target.value
      })
    }

    onChangeEmail = (e) => {
      this.setState({
        email : e.target.value
      })
    }

    onchagePassword = (e) => {
      this.setState({
        password : e.target.value
      })
    }

    onChangeDob = (e) => {
      this.setState({
        dob : e.target.value
      })
    }

    onChangeStatus = (e) => {
      
      this.setState({
        status : e.target.value
      })
    }

    onChangeRole = (e) => {
      this.setState({
        role : e.target.value
      })
    }

    onChangeGender = (e) => {
      this.setState({
        gender : e.target.value
      })
    } 

    onhandleBack = (e) =>{
        this.props.history.push('/account')
      //window.location.href = '/#/account';  
    }
    render(){
      var token = localStorage.getItem('token');
      var RoleId = localStorage.getItem('RoleId')
      if (token === null || token === undefined ||RoleId === null || RoleId === undefined) {
        this.props.history.push('/login');
      }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create an employee account</p>
                    <p>Step {this.state.step} of 2</p>
                    <div style={{display:  this.state.step === 1 ? 'block' : 'none'}}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.firstname} onChange={this.onChangeFirtsname} placeholder="First Name" autoComplete="firstname" />
                    
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.lastname}  onChange={this.onChangeLastname} placeholder="Last Name" autoComplete="lastname" />
                
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={this.onChangeUsername} value={this.state.username} placeholder="Username" autoComplete="username" />
                     
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email" autoComplete="email" />
           
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" value={this.state.password}  onChange={this.onchagePassword} placeholder="Password" autoComplete="new-password" />
                    
                    </InputGroup>
                    {/* <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup> */}
                    <Button onClick={this.onhandleNext} color="primary">Next</Button>
                    </div>
                    <div style={{display:  this.state.step === 2 ? 'block' : 'none'}}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Role
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select"  value={this.state.role} onChange={this.onChangeRole}>
                      <option>Select Role..</option>
                      <option value="Developer">Developer</option>
                      <option value="Scrum Master">Scrum Master</option>
                      <option value="Product Owner">Product Owner</option>
                      <option value="Human Resource">Human Resource</option>
                      <option value="MOKKI Design Team" >MOKKI Design Team</option>
                      </Input>
                     
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Status
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select"  value={this.state.status} onChange={this.onChangeStatus}>
                      <option>{this.state.status}</option>
                      <option value="Internship">Internship</option>
                      <option value="Full-Time Worker">Full-Time Worker</option>
                      </Input>
            
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Birthday
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="date"  value={this.state.dob} onChange={this.onChangeDob} />
                      
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Gender
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select"  value={this.state.gender} onChange={this.onChangeGender}>
                      <option value>{this.state.gender}</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      </Input>
                 
                    </InputGroup>
                    <Button onClick={this.onhandlePrevius} color="primary">Previus</Button>&nbsp;
                    <Button onClick={this.onhandleSubmit} color="success">Create Account</Button>
                  </div>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Button color='danger' block onClick={this.onhandleBack} >Back to Dashboard</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      );
    }
  }


export default EditAccount;
