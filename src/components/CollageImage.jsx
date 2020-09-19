import React, { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { Container, Row, Col, Button  } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLockOpen, faLock} from '@fortawesome/free-solid-svg-icons'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import example from "../data/example";

export default function CollageImage() {
  const [count, setCount] = useState(4);
  const [photos, setPhotos] = useState(example);
  const [source, setSource] = useState("Photo Credit: the happiest face =), asim alnamat, Deden Dicky Ramdhani, Marta Branco");
  const [lock, setLock] = useState(false);
  const [copied, setCopied]  = useState(false);

  function handleClick() {
    const rand = Math.floor(Math.random() * 100);

    const fullQuery =
      "https://api.pexels.com/v1/curated?per_page=" + count + "&page=" + rand;
    if(!lock) {

      axios
        .get(fullQuery, {
          headers: {
            Authorization: process.env.GATSBY_PEXEL_API_KEY
          }
        })
        .then((res) => {

          return new Promise(function(resolve, reject) {
              const photos = res.data.photos;
              setPhotos(photos);
              resolve(photos);
          });
        }).then((photos)=> {
          let sourcePath = "";
          for (let i=0; i < photos.length; i++) {
            if (i === 0) {
              sourcePath = sourcePath + "Photo Credit: " +photos[i].photographer + ", "
            } else if (i === photos.length-1) {
              sourcePath = sourcePath +photos[i].photographer
            } else {
              sourcePath = sourcePath +photos[i].photographer + ", "
            }
          }
          setSource(sourcePath)
        });
    }
  }


  function handleLock() {
    setLock(!lock);
  }

  return (
    <Container fluid className="wrap-light">
      <Row className="pad">

        <Col md="auto">
          <Button variant="dark" onClick={handleClick}> Refresh </Button>
        </Col>
        <Col md="auto">
          <CopyToClipboard text={source}>
            <Button variant="outline-dark"> Copy Photo Credit </Button>
          </CopyToClipboard>
        </Col>
        <Col xs md="auto">
          {lock ? <div className="wrap-dark"> Locked <FontAwesomeIcon icon={faLock} onClick={handleLock} size="1x" /> </div>: <div className="wrap-dark"> Unlocked <FontAwesomeIcon icon={faLockOpen} onClick={handleLock} size="1x" /> </div>}
        </Col>
      </Row>

    {photos.map((photo) => {
      return(
      <Row className="pad">
        <Col>
          <img className="img-fluid" key={photo.id} src={photo.src.medium} />
        </Col>
        <Col>
          <h5>Source: </h5>
          <p className="source-link"> Photographer - <a href={photo.photographer_url}>{photo.photographer} </a></p>
          <Button className="btn-green" href={photo.src.original} target="_blank" download> Download </Button>
        </Col>
      </Row>
      );
    })}


    </Container>
  );
}
