'use client';
import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
};

const PaginationExample = () => {
  // contoh data dummy
  const data: User[] = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
  }));

  // state jumlah data per halaman (bisa diganti user)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // hitung index data yang mau ditampilkan
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // handle perubahan jumlah data per halaman
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset ke halaman pertama
  };

  return (
    <div className="p-4 space-y-4">
      {/* Dropdown untuk pilih jumlah data */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Tampilkan</span>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          {[10, 25, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-700">data per halaman</span>
      </div>

      {/* Tabel / daftar data */}
      <ul className="border rounded-md divide-y">
        {currentData.map((item) => (
          <li key={item.id} className="p-2 hover:bg-gray-50">
            {item.id}. {item.name}
          </li>
        ))}
      </ul>

      {/* Navigasi pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Menampilkan {startIndex + 1} - {Math.min(endIndex, data.length)} dari{' '}
          {data.length} data
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Halaman {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationExample;
