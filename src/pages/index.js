import React from "react";
import Header from "../components/Header";
import Top from "../components/Top";
import Collage from "../components/Collage";
import Information from "../components/Information";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Top />
      <Collage />
      <Information />
      <Footer />
    </div>
  );
}
