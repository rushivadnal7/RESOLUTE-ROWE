import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo3D from '../components/Logo3D';
import { preloadImages } from '../utils/preloadimages';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const imageUrls = Array.from(document.images).map((img) => img.src);
    preloadImages(imageUrls).then(() => {
      let interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 500); // Smooth transition
            return 100;
          }
          return prev + 2;
        });
      }, 30);
    });
  }, [onComplete]);

  return (
    <Wrapper>
      <Loader>
        {/* Wrapper for both progress circle & logo */}
        <ProgressWrapper>
          <ProgressCircle />
          <LogoContainer>
            <Logo3D />
          </LogoContainer>
        </ProgressWrapper>

        <ProgressText>{progress}%</ProgressText>
      </Loader>
    </Wrapper>
  );
};

export default LoadingScreen;

// Styled Components
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ProgressWrapper = styled.div`
  position: relative; /* Makes this a reference point for absolute positioning */
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top-color: black;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LogoContainer = styled.div`
  position: absolute; /* Now relative to ProgressWrapper */
  width: 60px;
  height: 60px;
`;

const ProgressText = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;
