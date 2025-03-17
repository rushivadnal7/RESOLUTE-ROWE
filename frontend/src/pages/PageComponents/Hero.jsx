import React from "react";
import hero from "../../assets/heroPageImage.png";
import mobile_bg_hero from "../../assets/mobile-view-hero-bg.png";
import BorderButton from "../../components/BorderButton";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Logo3D from "../../components/Logo3D";
import hero_bg_image from '../../assets/hero-page-background-image.png'
import { BlobGradient } from "../../wrappers/blobGradient";

const Hero = () => {

  const navigate = useNavigate();
  //data-scroll data-scroll-section data-scroll-speed='-.1'
  return (
    <div className="hero">
      <div className="mobile-view-bg-image">
        <h1>hello</h1>
        <img loading="lazy" src={mobile_bg_hero} alt="hero" />
      </div>
      <BlobGradient>
        <div className="blob-inner-container">
          <div className="blob">
          </div>
        </div>
      </BlobGradient>
      {/* <div className="blob-container">
        <div className="blob-inner-container">
          <div className="blob">
          </div>
        </div>
      </div> */}
      <div className="logo-container">
        <Logo3D />
      </div>
      <div className="main-container">
        <img className="hero-image" rel="preload" loading="lazy" src={hero_bg_image} alt="hero-image" />
      </div>
    </div>
  );
};

export default Hero;
