// SizeChartModal.styled.js
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);  // Semi-transparent background overlay
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    
  }

`;

export const ModalContent = styled.div`
  background: white;
  height: 500px;
  width: 90%;  // Adjusted width for better responsiveness
  max-width: 700px;
  padding: 25px;  // Slightly increased padding for more space
  border-radius: 10px;  // Softer corners
  position: relative;
  text-align: center;
  overflow-y: scroll ;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  // Added shadow for depth
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  background: none;
  border: none;
  color: #333;  // Slightly darker color for visibility
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #555;  // Hover effect for better UX
  }
`;

export const Title = styled.h2`
  font-size: 1.6em;  // Slightly larger for better readability
  margin-bottom: 15px;
  font-weight: 600;  // Slightly bolder for emphasis
`;

export const Table = styled.table`
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  text-align: center;

  th, td {
    padding: 12px;  // More padding for better readability
    border: 1px solid #333;  // Darker border color for contrast
  }
  
  th {
    background: #333;  // Dark background for header
    color: #fff;  // White text color for header
    font-weight: 600;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f7f7f7;  // Light background for alternate rows
  }
`;

export const TableData = styled.td`
  padding: 12px;  // Consistent padding with Table
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  img {
    max-width: 80%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 5px;  // Soft corners for images
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);  // Slight shadow for depth
  }
`;

export const MeasurementText = styled.div`
  text-align: left;
  margin-top: 20px;

  h3 {
    margin-top: 10px;
    font-size: 1.2em;
    font-weight: 600;  // Slightly bolder
    color: #333;
  }

  p {
    margin: 5px 0;
    font-size: 0.95em;  // Slightly smaller for readability
    color: #555;
  }
`;

export const SizeGuideButton = styled.button`
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  background: #fff;
  border: 1px solid #ddd;
  color: #000;
  cursor: pointer;
  writing-mode: vertical-rl;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {

  }

`;