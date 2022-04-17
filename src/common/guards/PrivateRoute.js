import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  let location = useLocation();

  if (!currentUser) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
