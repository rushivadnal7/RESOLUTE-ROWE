import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "styled-components";
import Allproducts from "./pages/Allproducts";
import Customize from "./pages/Customize";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Cart from "./pages/Cart";
import ProductView from "./pages/ProductView";
import Account from './pages/Account'

import { ToastContainer , Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./pages/Admin";
import CustomerDetails from "./pages/CustomerDetails";

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
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/account/login",
      element: <Login />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/cart/customerdetails",
      element: <CustomerDetails/>,
    },
    {
      path: "/products/productview",
      element: <ProductView />,
    },
  ]);

  const theme = {
    breakpoints: {
      xs: "0px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
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
