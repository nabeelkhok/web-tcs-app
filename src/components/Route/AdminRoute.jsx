import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/Authcontext';  // Note: Corrected capitalization

const AdminRoute = () => {
  const { currentUser, isAdmin, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show loading state while auth status is being checked
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  // If not authenticated or not admin, redirect to login with return location
  if (!currentUser || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Render child routes if authenticated and admin
  return <Outlet />;
};

export default AdminRoute;