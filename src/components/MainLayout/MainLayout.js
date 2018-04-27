import React from 'react';
import Header from './Header';

function MainLayout({ children }) {
  return (
    <div>
      <Header appName="realworld" currentUser={{}} />
        {children}
    </div>
  );
}

export default MainLayout;