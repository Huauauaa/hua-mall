import React from 'react';
import { Outlet } from 'react-router-dom';

function RareLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default RareLayout;
