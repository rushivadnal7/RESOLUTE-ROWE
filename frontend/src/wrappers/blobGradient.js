import styled from "styled-components";

export const BlobGradient = styled.div`
  height: 100%;
  width: 100%;
  inset: 0;
  margin: auto;
  filter: blur(100px);
  opacity: 0.4;
  .blob-inner-container {
    border-radius: 99999px;
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100vw;
    height: 100vh;
    min-width: 1000px;
    overflow: hidden;
    background-color: #36454F;
    /* background-color: #DA70D6; */
    transform: scale(0.7);
  }

  .marquee-blob-inner-container {
    border-radius: 99999px;
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100vw;
    height: 500px;
    top: 0%;
    left: 0%;
    min-width: 1000px;
    overflow: hidden;
    background-color: #fff;
    transform: translateX(-50%) scale(0.3);
    z-index: -2000;
  }

  .blob {
    position: absolute;
    width: 300px;
    height: 300px;
    /* top: 0%;
    left: 0%; */
    /* transform: translate(-50%,-50%); */
    z-index: -2000;
    inset: 0;
    margin: auto;
    background: conic-gradient(
      from 0deg,
      #BF953F,
      #BF953F,
      #BF953F,
      #DBA514,
      #FCC201,
      #FCF6BA
    );
    /* background: conic-gradient(
      from 0deg,
      #B2BEB5,
      #C0C0C0,
      #E5E4E2,
      #818589,
      #EBECF0,
      #d8d8d8,
      #FCF6BA
    ); */
    animation: spinBlob 8s linear infinite;
  }
`;
