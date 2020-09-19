import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <Container fluid className="nav-color footer">
      <Row>
        <Col>
          <p> Collage Image Finder © {date}</p>
        </Col>
      </Row>
    </Container>
  );
}
