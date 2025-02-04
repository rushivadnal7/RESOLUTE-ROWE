import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "styled-components";
import Allproducts from "./pages/Allproducts";
import Customize from "./pages/Customize";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Cart from "./pages/Cart";
import ProductView from "./pages/ProductView";
import Account from './pages/Account'
import UserOrders from "./pages/UserOrders"

import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./pages/Admin";
import CustomerDetails from "./pages/CustomerDetails";
import AdminProtectedRoute from "./components/admin_components/AdminProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/products",
      element: <Allproducts />,
    },
    {
      path: "/customize",
      element: <Customize />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/account",
      element: <Account />,
    },
    {
      path: "/orders",
      element: <UserOrders />,
    },
    {
      path: "/admin",
      element: <AdminProtectedRoute />, // AdminProtectedRoute checks token and role
      children: [
        {
          index: true, // Default route for /admin
          element: <Admin />, // Render Admin page if valid
        },
      ],
    },

    {
      path: "/account/login",
      element: <Login />,
    },
    {
      path: "/account/forgotpassword",
      element: <ForgotPassword/>,
    },
    {
      path: "/account/forgotpassword/verifyotp",
      element: <VerifyOtp/>,
    },
    {
      path: "/account/forgotpassword/verifyotp/changepassword",
      element: <ChangePassword/>,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/cart/customerdetails",
      element: <CustomerDetails />,
    },
    {
      path: "/customerdetails",
      element: <CustomerDetails />,
    },
    {
      path: "/products/:productID",
      element: <ProductView />,
    },
  ]);

  const theme = {
    breakpoints: {
      xs: "576px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1400px",
    },
    media: {
      xs: `(max-width: 575px)`, // Up to 575px
      sm: `(min-width: 576px) and (max-width: 767px)`, // From 576px to 767px
      md: `(min-width: 768px) and (max-width: 991px)`, // From 768px to 991px
      lg: `(min-width: 992px) and (max-width: 1299px)`, // From 992px to 1199px
      xl: `(min-width: 1300px)`, // 1200px and above
    },

  };


  return (
    <>

      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <ToastContainer position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            limit={3}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            toastClassName={"toastBody"} />
          <RouterProvider router={router} />
        </DndProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
