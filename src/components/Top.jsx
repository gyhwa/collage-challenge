import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLockOpen, faLock} from '@fortawesome/free-solid-svg-icons'
import { AnchorLink } from "gatsby-plugin-anchor-links";

export default function Top() {
  return (
    <Container fluid className="wrap-green">
      <Row className="pad">
        <Col>
          <h1 className="hero"> Collage Challenge </h1>
          <h3> The Challenge: </h3>
          <p> Use four images generated from this website and make a collage.</p>
          <p>
            Click <AnchorLink
              to="/#example"
              title="here"
              className="stripped"
              stripHash
            /> to see an example. Share your collages with #pexcollagechallenge and remember to credit the photographers.
          </p>
          <h3> How This Site Works: </h3>
          <p> In the below section, click Refresh to get a new set of images. Click the <FontAwesomeIcon icon={faLock} size="1x" /> / <FontAwesomeIcon icon={faLockOpen} size="1x" /> below to toggle locking an image from Refresh. Remember to give the photographers credit! You can click "Copy Photo Credit" and you'll automatically copy the all the photographers' names. </p>
          <p> Photos provided by <a href="https://www.pexels.com/">Pexels</a>. </p>
        </Col>
      </Row>
    </Container>
  );
}
