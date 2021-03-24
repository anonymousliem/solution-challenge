import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./Components/NavbarNew";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <NavbarComponent />
        <Container>
          <Row xs="1" sm="1" md="1" style={{ marginTop: "2%" }}>
            {/* <Col>
    <CardImg top width="100%" src="https://cdn0.iconfinder.com/data/icons/hardware-solid-set/512/phone_portrait_mode_hardware_solid_a-512.png" alt="Card image cap" />
    </Col> */}
            <Col>
              <center>
                <h1>
                  <b>ABOUT US</b>
                </h1>
              </center>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <center>
                <div>
                  <a href="/#/register">
                    <Button
                      color="danger"
                      style={{ width: "50%", height: "5rem" }}
                    >
                      <p style={{ fontSize: "30px" }}>
                        <b>REGISTER</b>
                      </p>
                    </Button>
                  </a>
                </div>
              </center>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row xs="1" sm="1" md="2" style={{ marginTop: "2%" }}>
            <Col>
              <Card>
                <CardImg
                  top
                  width="100%"
                  style={{ height: "10%" }}
                  src="https://icons-for-free.com/iconfiles/png/512/business+face+people+icon-1320086457520622872.png"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle tag="h5">Card Title</CardTitle>
                  <CardText>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </CardText>
                  <CardText>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardImg
                  top
                  width="100%"
                  style={{ height: "10%" }}
                  src="https://icons-for-free.com/iconfiles/png/512/business+face+people+icon-1320086457520622872.png"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle tag="h5">Card Title</CardTitle>
                  <CardText>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </CardText>
                  <CardText>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <center>
            <b>CODE WITH &#10084; BY DSC UNDIP</b>
          </center>
        </Container>
      </div>
    );
  }
}

export default HomePage;
