import React from 'react';
import { Outlet } from 'react-router';

function IPRPage() {
  return (
    <div style={{width: '222px'}}>
      <div>IPRPage</div>
      <Outlet />
    </div>
  )
}

export default IPRPage;
