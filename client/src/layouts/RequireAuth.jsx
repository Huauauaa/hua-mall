import { Navigate, useLocation } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import { useContext } from 'react';

function RequireAuth({ children }) {
  const { authState } = useContext(AuthContext);

  const location = useLocation();

  if (!authState.status || authState.user?.username !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
