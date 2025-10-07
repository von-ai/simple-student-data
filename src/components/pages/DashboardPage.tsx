import { Navbar, Heading } from '../dashboard/index';
import React from 'react';

const DashboardPage = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="pt-3">
        <Heading />
      </div>
    </>
  );
};

export default DashboardPage;
