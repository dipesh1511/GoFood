import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
function Home() {
  return (
    <>
      <div>
        {" "}
        <Navbar />
      </div>
      <Carousel></Carousel>
      <div className="m-3">
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
