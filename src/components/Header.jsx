import React from "react";
import { Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar className="nav-color">
      <Navbar.Brand>
        <img
          src="../favicon.ico"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Collage Image logo"
        />
      </Navbar.Brand>
    </Navbar>
  );
}
