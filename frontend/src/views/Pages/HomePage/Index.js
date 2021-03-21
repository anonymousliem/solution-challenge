import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./Components/NavbarNew";
import {Row, Col} from 'reactstrap';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }
  render() {
    return     <div className='App'>
    <NavbarComponent />
    <Row style={{marginTop:'2%'}}>
        <Col xs="2"></Col>
        <Col xs="3"><img alt="images" src="https://cdn0.iconfinder.com/data/icons/hardware-solid-set/512/phone_portrait_mode_hardware_solid_a-512.png" /></Col>
        <Col xs="5">
          <h1><b>ABOUT US</b></h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </Col>
        <Col xs="1"></Col>
    </Row>

    <Row style={{marginTop:'2%'}}>
        <Col xs="2"></Col>
        <Col xs="4"><p>tes</p></Col>
        <Col xs="4">
        <p>tes2</p>
        </Col>
        <Col xs="1"></Col>
    </Row>
  </div>
  }
}

export default HomePage;
