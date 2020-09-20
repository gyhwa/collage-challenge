import React, { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { Container, Row, Col, Button, ButtonGroup  } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLockOpen, faLock} from '@fortawesome/free-solid-svg-icons'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import example from "../data/example";

export default function CollageImage() {
  const [count, setCount] = useState(1);
  const source = "Photo Credit: the happiest face =), asim alnamat, Deden Dicky Ramdhani, Marta Branco"
  const [request, setRequest] = useState({source: source, photos: example})
  const [locks, setLock] = useState([false, false, false, false]);

  function handleRefresh () {

    const fullQueryOne = "https://api.pexels.com/v1/curated?per_page=" + count + "&page=" +  Math.floor(Math.random() * 80);
    const fullQueryTwo = "https://api.pexels.com/v1/curated?per_page=" + count + "&page=" +  Math.floor(Math.random() * 80);
    const fullQueryThree = "https://api.pexels.com/v1/curated?per_page=" + count + "&page=" +  Math.floor(Math.random() * 80);
    const fullQueryFour = "https://api.pexels.com/v1/curated?per_page=" + count + "&page=" +  Math.floor(Math.random() * 80);

    const url = [fullQueryOne, fullQueryTwo, fullQueryThree, fullQueryFour]
    const queries = []
    for (let i = 0; i < locks.length; i++) {
      if (!locks[i]) {
        queries.push(axios.get(url[i], {headers: {Authorization: process.env.GATSBY_PEXEL_API_KEY}}))
      } else {
        //queries.push(axios.get(url[i], {headers: {Authorization: process.env.GATSBY_PEXEL_API_KEY}}))
        queries.push("")
      }
    }

    axios.all(queries).then(axios.spread((...responses) => {
      const oldPhotos = request.photos;
      const newPhotos = [...oldPhotos];

      for (let i = 0; i < locks.length; i++) {
        if (!locks[i]) {
          newPhotos[i] = responses[i].data.photos[0]
          console.log(responses[i].data.photos[0])
        }
      }


    let sourcePath = "";
    for (let i=0; i < locks.length; i++) {
      if (i === 0) {
        sourcePath = sourcePath + "Photo Credit: " +newPhotos[i].photographer + ", "
      } else if (i === locks.length-1) {
        sourcePath = sourcePath +newPhotos[i].photographer
      } else {
        sourcePath = sourcePath +newPhotos[i].photographer + ", "
      }
    }

    setRequest((prevState) => {
      return({
        ...prevState,
        source: sourcePath,
        photos: newPhotos
      });
    });
  }))
}

  function handleLock(event) {
      const {value} = event.currentTarget;
      const oldLocks = locks;
      const newLocks = [...oldLocks];
      newLocks[value] = !newLocks[value];
      setLock(newLocks)
  }

  return (
    <Container fluid className="wrap-light">
      <Row className="pad">
        <Col md="auto">
          <Button id="refresh" variant="dark" onClick={handleRefresh}> Refresh </Button>
        </Col>
        <Col xs md="auto">
          <CopyToClipboard text={request.source}>
            <Button variant="outline-dark"> Copy Photo Credit </Button>
          </CopyToClipboard>
        </Col>
      </Row>

      {request.photos.map((photo, index) => {
        return(
        <Row key={index} className="pad">
          <Col>
            <img className="img-fluid" src={photo.src.medium} />
          </Col>
          <Col>
            <h5>Source: </h5>
            <p className="source-link"> Photographer - <a href={photo.photographer_url}>{photo.photographer} </a></p>
            <ButtonGroup aria-label="Basic example">
            <Button style={{backgroundColor: "#006a71", borderColor: "#006a71"}} href={photo.src.original} target="_blank" download> Download </Button>
            <Button style={{backgroundColor: "#006a71", borderColor: "#006a71"}} value={index} onClick={handleLock}>
              {locks[index] ? <div> Locked <FontAwesomeIcon icon={faLock} size="1x" /> </div>: <div> Unlocked <FontAwesomeIcon icon={faLockOpen} size="1x" /> </div>}
            </Button>
            </ButtonGroup>
          </Col>
        </Row>
        );
      })}
    </Container>
  );
}
