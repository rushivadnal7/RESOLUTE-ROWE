import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fc; /* Light background for main content */
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #2f3b52;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 10px 15px;
      margin: 10px 0;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #3b4a61;
      }
    }
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;

  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }
`;

export const SectionNavbar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &.active {
      background-color: #0056b3; /* Highlight the active section */
    }
  }
`;

export const Form = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #333;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
    width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
`

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export const ImageUploadSection = styled.div`
  margin-bottom: 20px;

  h3 {
    margin-bottom: 10px;
    color: #333;
    font-size: 1.2rem;
  }

  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

export const ImageBox = styled.div`
  flex: 1;
  min-width: 200px;

  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    border: 1px dashed #aaa;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: #007bff;
    }

    img {
      margin-top: 10px;
      max-width: 100%;
      border-radius: 4px;
    }
  }
`;

export const ProductList = styled.div`
  margin-top: 20px;
`;

export const ListItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  .edit-option-button{
    position: absolute;
    top: 40px;
    right: 100px;
    transition: all 0.3s ease;
  
    &:hover{
      color: red;
    }
  }
  .delete-option-button{
    position: absolute;
    top: 40px;
    right: 50px;
    transition: all 0.3s ease;

    &:hover{
      color: red;
    }
  }



  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }

  h3 {
    font-size: 1.2rem;
    color: #333;
  }

  p {
    margin: 0;
    color: #555;
  }
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.h3`
  margin: 0;
  margin-bottom: 15px;
  font-size: 20px;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  .confirm {
    background-color: #f44336;
    color: #fff;
  }

  .cancel {
    background-color: #ccc;
    color: #000;
  }
`;