import React from "react";
import Header from "../components/Header";
import Top from "../components/Top";
import CollageImage from "../components/CollageImage";
import Information from "../components/Information";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Header />
      <Top />
      <CollageImage />
      <Information />
      <Footer />
    </div>
  );
}
