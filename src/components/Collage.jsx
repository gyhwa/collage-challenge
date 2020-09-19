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
  const [photos, setPhotos] = useState(example);
  const [source, setSource] = useState("Photo Credit: the happiest face =), asim alnamat, Deden Dicky Ramdhani, Marta Branco");
  const [locks, setLock] = useState([false, false, false, false]);

  function handleRefresh () {
    const rand = Math.floor(Math.random() * 80);

    const fullQuery =
      "https://api.pexels.com/v1/curated?per_page=" + count + "&page=" + rand;
    for (let i = 0; i < locks.length; i++) {
      if (!locks[i]) {
        axios
          .get(fullQuery, {
            headers: {
              Authorization: process.env.GATSBY_PEXEL_API_KEY
            }
          })
          .then((res) => {
            return new Promise(function(resolve, reject) {
                const newPhoto = res.data.photos;
                const oldPhotos = photos;
                const newPhotos = [...oldPhotos];
                newPhotos[i] = newPhoto[0];
                setPhotos(newPhotos);
                resolve(newPhotos);
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
    console.log("finished")
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
          <CopyToClipboard text={source}>
            <Button variant="outline-dark"> Copy Photo Credit </Button>
          </CopyToClipboard>
        </Col>
      </Row>


      {photos.map((photo, index) => {
        return(
        <Row key={photo.id} className="pad">
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
