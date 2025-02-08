import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Sidebar,
  MainContent,
  Button,
  ProductList,
  ListItem,
  SectionNavbar,
} from "../wrappers/admin";
import { toast } from 'react-toastify'
// import { AddProduct } from "../api/productapi";
import AddProduct from "../components/admin_components/AddProduct";
import ListProducts from "../components/admin_components/ListProducts";
import { useNavigate } from "react-router-dom";
import ListDesigns from "../components/admin_components/ListDesigns";
import AddDesigns from "../components/admin_components/AddDesigns";
import { adminLogout } from "../api/adminapi";


const Admin = () => {
  const [currentPage, setCurrentPage] = useState("dashboard"); // Tracks which sidebar page is active
  const [currentSection, setCurrentSection] = useState("listProducts"); // Tracks which Manage Products section is active
  const navigate = useNavigate()
  const [productList, setProductList] = useState([]);

  console.log('admin')

  // Render Manage Products sections
  const renderManageProductsSection = () => {
    switch (currentSection) {
      case "listProducts":
        return (
          <ListProducts />
        );

      case "addProduct":
        return (
          <AddProduct />
        );
      default:
        return null;
    }
  };
  const renderManageDesigns = () => {
    switch (currentSection) {
      case "listProducts":
        return (
          <ListDesigns />
        );

      case "addProduct":
        return (
          <AddDesigns />
        );
      default:
        return null;
    }
  };

  const logoutHandler = async () => {

    const response = await adminLogout()
    if (response.success) {
      navigate('/')
    }
  }



  const handleExport = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}${currentDate.toLocaleString("en-us", { month: "short" })}${currentDate.getFullYear().toString().slice(-2)}`;
      const fileName = `orders_${formattedDate}.xlsx`;
      const response = await axios.get("http://localhost:7007/api/order/export", {
        responseType: "blob", // Important to handle binary data
      });

      if(!response.data.success){
        console.log(response.data.message)
        toast.info(response.data.message)
      }

      // Create a Blob from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName; // File name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting orders:", error);
    }
  };


  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setCurrentPage("dashboard")}>Dashboard</li>
          <li onClick={() => setCurrentPage("manageProducts")}>Manage Products</li>
          <li onClick={() => setCurrentPage("manageDesigns")}>Manage Designs</li>
          <li onClick={logoutHandler}>Logout</li>
        </ul>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {currentPage === "dashboard" && (
          <>
            <h1>Welcome to the Dashboard</h1>
            <Button onClick={handleExport}>Export Order Data</Button>
          </>
        )}
        {currentPage === "manageProducts" && (
          <div>
            <SectionNavbar>
              <Button
                className={currentSection === "listProducts" ? "active" : ""}
                onClick={() => setCurrentSection("listProducts")}
              >
                List Products
              </Button>
              <Button
                className={currentSection === "addProduct" ? "active" : ""}
                onClick={() => setCurrentSection("addProduct")}
              >
                Add Product
              </Button>
            </SectionNavbar>


            {/* Render the selected section */}
            {renderManageProductsSection()}
          </div>
        )}

        {
          currentPage === 'manageDesigns' && (
            <div>
              <SectionNavbar>
                <Button
                  className={currentSection === "listProducts" ? "active" : ""}
                  onClick={() => setCurrentSection("listProducts")}
                >
                  List Designs
                </Button>
                <Button
                  className={currentSection === "addProduct" ? "active" : ""}
                  onClick={() => setCurrentSection("addProduct")}
                >
                  Add Designs
                </Button>
              </SectionNavbar>


              {/* Render the selected section */}
              {renderManageDesigns()}
            </div>
          )
        }
      </MainContent>
    </Container>
  );
};

export default Admin;
