'use client';
import { Navbar, Heading, FormField, TabelData } from '../dashboard/index';
import React, { useState } from 'react';
import { Input } from '../types/form-fields-type';

const DashboardPage = () => {
  const [dataMhs, setDataMhs] = useState<Input[]>([]);

  const handleFormSubmit = (newData: Input) => {
    setDataMhs((e) => [...e, newData]);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="pt-3">
        <Heading
          data={dataMhs}
          onImport={(importedData) => setDataMhs(importedData)}
        />
      </div>
      <div className="pt-3">
        <FormField onSubmitData={handleFormSubmit} />
      </div>
      <div className="pt-3">
        <TabelData
          data={dataMhs}
          onDataChange={(newData) => setDataMhs(newData)}
        />
      </div>
    </>
  );
};

export default DashboardPage;
