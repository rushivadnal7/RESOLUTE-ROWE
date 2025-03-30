import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateAdmin } from "../../api/adminapi";

const AdminProtectedRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await validateAdmin();
        setIsAdmin(response);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) return <div>Loading...</div>; 
  if (!isAdmin) return (
    console.log('not a admin'),
    <Navigate to="/account/login" replace />
  ); 

  return <Outlet />; 
};

export default AdminProtectedRoute;
