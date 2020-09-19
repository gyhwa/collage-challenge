import React from "react";
import { Container, Row, Col } from "react-bootstrap";


export default function Information() {
  return (
    <Container fluid id="example" className="wrap-green">
      <Row className="pad">
        <Col>
          <h3> Examples: </h3>
          <p>Here's an example of a collage made with four images.</p>
          <p> Original images from <a href="https://www.pexels.com/@jack-redgate-333633">Jack Redgate</a>, <a href="https://www.pexels.com/@nadi-lindsay-1130679">Nadi Lindsay</a>, <a href="https://www.pexels.com/@rethaferguson">rf._.studio</a>, and <a href="https://www.pexels.com/@readymade">ready made</a></p>
        </Col>
      </Row>
      <Row className="pad-minor">
      <Col>
        <p> Original Images </p>
        <img className="img-fluid" src="../List.gif" />
      </Col>
        <Col>
          <p> Combined Image </p>
          <img className="img-fluid" src="../Final.png" />
        </Col>
      </Row>
    </Container>
  );
}
