import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="logo">
        <i className="fa-solid fa-bars"></i>
      </div>
      <Footer />
    </>
  );
};

export default Home;
