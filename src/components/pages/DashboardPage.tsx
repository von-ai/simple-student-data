'use client';
import { Navbar, Heading, FormField, TabelData } from '../dashboard/index';
import React, { useState } from 'react';
import { Input } from '../types/form-fields-type';

const DashboardPage = () => {
  const [dataMhs, setDataMhs] = useState<Input[]>([]);
  const [editingData, setEditingData] = useState<Input | null>(null);

  const handleFormSubmit = (newData: Input) => {
    if (editingData) {
      // mode edit
      setDataMhs((prev) =>
        prev.map((item) => (item.nim === editingData.nim ? newData : item))
      );
      setEditingData(null);
    } else {
      setDataMhs((e) => [...e, newData]);
    }
  };

  const handleEdit = (nim: string) => {
    const target = dataMhs.find((d) => d.nim === nim);
    if (target) setEditingData(target);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="pt-3">
        <Heading
          data={dataMhs}
          onImport={(importedData) => {
            setDataMhs((prev) => {
              const existingNIMs = new Set(prev.map((m) => m.nim));
              const newUniqueData = importedData.filter(
                (m) => !existingNIMs.has(m.nim)
              );
              if (newUniqueData.length === 0) {
                alert(
                  'Tidak ada data baru yang ditambahkan — semua NIM sudah ada.'
                );
                return prev;
              }
              alert(`Berhasil menambahkan ${newUniqueData.length} data baru!`);
              return [...prev, ...newUniqueData];
            });
          }}
        />
      </div>
      <div className="pt-3">
        <FormField
          onSubmitData={handleFormSubmit}
          existingData={dataMhs}
          editingData={editingData}
        />
      </div>
      <div className="pt-3">
        <TabelData
          data={dataMhs}
          onDataChange={(newData) => setDataMhs(newData)}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
};

export default DashboardPage;
