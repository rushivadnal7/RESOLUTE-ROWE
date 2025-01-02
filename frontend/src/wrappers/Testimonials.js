import styled from "styled-components";

const TestimonialWrapper = styled.section`
  /* background-color: #f9fafb; */
  background-color: white;
  /* background: radial-gradient(circle at bottom left , #A020F0, #000000 40%); */
  height: 100vh; /* Full height of the viewport */
  display: flex;
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */

  .container {
    max-width: 1200px;
    width: 100%; /* Allow container to stretch full width */
    padding: 0 20px;
  }

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Center align the cards */
    gap: 16px;
  }

  .card {
    position: relative; /* Needed for the pseudo-element */
    border-radius: 8px;
    overflow: hidden;
    width: calc(25% - 16px); /* Adjusted width for smaller cards */
    transition: transform 0.2s;

    /* Inner content box */
    display: flex;
    flex-direction: column;

    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 -1mm 4mm #002147);
    }
  }

  .card > .content {
    border-radius: 6px; 
    background: white; 
    padding: 16px; 
  }

  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .content {
    padding: 16px; /* Reduced padding for smaller cards */
  }

  .category {
    font-size: 12px;
    font-weight: 500;
    color: #a0aec0;
    margin-bottom: 8px;
  }

  .title {
    font-size: 16px; /* Reduced font size */
    font-weight: 500;
    color: #2d3748;
    margin-bottom: 12px;
  }

  .description {
    margin-bottom: 12px;
    font-size: 14px; /* Reduced font size */
  }

  .info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .learn-more {
    color: #5a67d8;
    display: flex;
    align-items: center;
    margin-right: auto;
  }

  .learn-more .icon {
    width: 16px;
    height: 16px;
    margin-left: 4px;
  }

  .views,
  .comments {
    color: #a0aec0;
    display: flex;
    align-items: center;
    margin-left: 12px;

    .icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }
`;

export default TestimonialWrapper;
