import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import {urlUser, divisionList, jobtitleList, urlRole} from '../../../Constant'
import $ from 'jquery';
class AddAccount extends Component {
      constructor(props){
          super(props);
          this.state={
            hidden: true,
            listRole : [],
            firstname : '',
            lastname : '',
            username  : '',
            email : '',
            password : '',
            dob : '',
            status : '',
            role : '',
            gender : '',
            url : urlUser,
            step : 1,
            selectedRole : {},
          }
      }

      GetRoles = () => {
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
          url: urlRole + '?page=1&size=25&order=%7B%7D&filter=%7B%7D',
          headers: Header,
        })
          .then(data => {
           // console.log(data.data.data)
            this.setState({
              listRole : data.data.data,
             
            });
          })
         
          .catch(err => {
            console.log(err);
          });
      }

      componentDidMount = () => {
        this.GetRoles();
        const dateTime =   new Date().toLocaleString();
        const value = localStorage.getItem("token");
        this.setState({
          token : value,
          dateTime : dateTime
        })

        var logged = localStorage.getItem("logged");
        if(logged === null ){
          //window.location.href = '/#/login';  
          this.props.history.push('/login')
        }

      }

    onhandleSubmit = (event) => {
      if (this.state.username !== "" && this.state.username !== null && this.state.password !== null && this.state.password !=="" 
      &&  this.state.firstname !== "" && this.state.firstname !== null && this.state.lastname !== null && this.state.lastname !== ""
      &&  this.state.gender !== "" && this.state.gender !== null && this.state.dob !== null && this.state.dob !== "" 
      && this.state.email !=="" && this.state.email !== ""){
        const Header = {
          accept: 'application/json',
          Authorization : `Bearer ` + this.state.token,
          'Content-Type' : 'application/json-patch+json'
        }
      
        const headerlur = {
          accept: 'application/json',
          Authorization : `Bearer ` +  localStorage.getItem('token'),
          'Content-Type' : 'application/json-patch+json'
        }
        axios({
          method: 'get',
          url: urlRole + '/' + this.state.selectedRoleValue,
          headers: Header,
          //data: Data,
        }).then(data => {
          console.log(data.data.data)
            this.setState({
              roleId : data.data.data._id,
              roleCode : data.data.data.code,
              roleName : data.data.data.name,
            })
          })
          .then(
            datas => {
              //alert (this.state.roleCode)
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
                "roles": [
                  {
                    "_id": this.state.roleId,
                    "code": this.state.roleCode,
                    "name": this.state.roleName
                  }
                ],
              }

              axios({
                method: 'post',
                url: urlUser,
                headers: headerlur,
                data: Data,
              })
              .then(data => {
                alert("berhasil");
               window.location.reload();
              })
              .catch(err => {
               alert("ERROR" + err)
              });  
            }
          )
          .catch(err => {
            alert(err);
          });
      }
      else{
        alert("Tidak Boleh Ada Data Yang Kosong")
      }
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



    onChangeRole = (selectedRole) => {
      if(selectedRole.value !== null){
        this.setState({
          selectedRole : selectedRole,
          selectedRoleValue : selectedRole.value
        })
      }
     
    }

    onChangeGender = (e) => {
      this.setState({
        gender : e.target.value
      })
    } 

    onhandlePrevius = () => {
     this.setState({
       step : this.state.step -1
     })
    }
    onhandleBack = (e) =>{
      //window.location.href = '/';  
      this.props.history.push('/account/listaccount');
    }

    toggleShow = (e) => {
      this.setState({ 
        hidden: !this.state.hidden, 
        });
    }
    render(){
      var token = localStorage.getItem('token');
      var RoleId = localStorage.getItem('RoleId')
      if (token === null || token === undefined ||RoleId === null || RoleId === undefined) {
        this.props.history.push('/login');
      }
      
      let roleList = this.state.listRole.map(function (role) {
        return { value: role._id, label: role .name };
      })

      $(".toggle-password").click(function() {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
     });
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Add Account</h1>
                    <p className="text-muted">Create an employee account</p>
                    <p>Step {this.state.step} of 2</p>
                    <div style={{display:  this.state.step === 1 ? 'block' : 'none'}}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={this.onChangeFirtsname} placeholder="First Name" autoComplete="firstname" />
                     
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={this.onChangeLastname} placeholder="Last Name" autoComplete="lastname" />
                    
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={this.onChangeUsername} placeholder="Username" autoComplete="username" />
                     
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={this.onChangeEmail} placeholder="Email" autoComplete="email" />
                     
                    </InputGroup>
                   
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                    
                 
                    <Input type={this.state.hidden ? "password" : "text"} onChange={this.onchagePassword}  name="password" placeholder="Password" autoComplete="new-password" id="password-field" />                    
                    
                      <i className={this.state.hidden ? "fa fa-eye" : "fa fa-eye-slash"} style={{fontSize : 30}} onClick={this.toggleShow}></i>         
          

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
                    <Row>
                    <Col style={{marginRight:'-30px'}} md={3} ><InputGroupText>
                          Role
                        </InputGroupText>
                    </Col>
                    <Col>     <Select
                      name="form-field-name"
                      value={this.state.selectedRole}
                      onChange={this.onChangeRole}
                      options={roleList} /> <br /></Col>
                    </Row>

                    
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Birthday
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="date" onChange={this.onChangeDob} />
                     
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Gender
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select"  value={this.state.value} onChange={this.onChangeGender}>
                      <option>Select Gender..</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      </Input>
                 
                    </InputGroup>
                    <Button onClick={this.onhandlePrevius} color="primary">Previous</Button>&nbsp;
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


  export default AddAccount;
