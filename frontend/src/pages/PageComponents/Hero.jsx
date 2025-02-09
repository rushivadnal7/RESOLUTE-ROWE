import React from "react";
import hero from "../../assets/heroPageImage.png";
import mobile_bg_hero from "../../assets/mobile-view-hero-image.jpg";
import BorderButton from "../../components/BorderButton";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Logo3D from "../../components/Logo3D";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <div data-scroll data-scroll-section data-scroll-speed='-.3' className="hero">
      <div className="mobile-view-bg-image">
        <img src={mobile_bg_hero} alt="hero" />
      </div>
      <div className="left-container">
        <h1 className="hero-title">Resolute & Rowe</h1>
        <div className="buttons">
          <BorderButton onclick={() => navigate('/products')} text={'Products'} bgColor={'black'}/>
            
        </div>
      </div>
      <div className="logo-container">
        <Logo3D/>
      </div>
      <div className="right-container">
        <img className="hero-image" src={hero} alt="hero-image" />
      </div>
    </div>
  );
};

export default Hero;
