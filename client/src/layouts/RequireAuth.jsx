import { Navigate, Outlet, useLocation } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import { useContext } from 'react';
import CommonLayout from './CommonLayout';

function RequireAuth({ adminRequired = false }) {
  const { authState } = useContext(AuthContext);

  const location = useLocation();

  if (
    !authState.status ||
    (adminRequired && authState.user?.username !== 'admin')
  ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}

export default RequireAuth;
