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

  if (isAdmin === null) return <div>Loading...</div>; // Show a loading message while validation is in progress
  if (!isAdmin) return <Navigate to="/account/login" replace />; // Redirect to login if not an admin

  return <Outlet />; // Render child routes if validation passes
};

export default AdminProtectedRoute;
