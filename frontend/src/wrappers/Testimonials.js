import styled from "styled-components";

const TestimonialWrapper = styled.section`
  background-color: black;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;

  h6{
      font-size: 2rem;
      font-weight: 600;
    }

  .container {
    max-width: 1200px;
    width: 100%;
    padding: 0 20px;
  }

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    width: calc(25% - 16px); 
    transition: transform 0.2s;

    display: flex;
    flex-direction: column;

    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 -1mm 4mm #002147);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .content {
      background:  gold;
      padding: 16px;
    }
  }

  .category {
    font-size: 12px;
    font-weight: 500;
    color: #a0aec0;
    margin-bottom: 8px;
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    color: white;
    margin-bottom: 12px;
  }

  .description {
    margin-bottom: 12px;
    font-size: 14px;
  }

  .info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

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

    
  }

  /* Responsive styles */
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
   
    
    .card {
      width: calc(50% - 16px);
    }

    .category {
      font-size: 10px; 
    }

    .title {
      font-size: 14px;
    }

    .description {
      font-size: 12px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: auto; 
    padding: 40px 0;

    .card {
      height: 50%;
      width: 80%; /* Full width for mobile screens */
      filter: drop-shadow(0 -1mm 4mm #002147);

    }

    .flex-wrap {
      gap: 4rem; /* Reduce gap between cards */
    }

    .content {
      padding: 12px; /* Adjust padding for mobile */
    }

    .category,
    .title,
    .description {
      text-align: center; /* Center text for mobile */
    }

    &:hover {
      transform: none;
      filter: none;
    }
  }
`;

export default TestimonialWrapper;
