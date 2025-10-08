'use client';
import React from 'react';
import { jurusanList } from '../types/form-fields-type';

type FilterBarProps = {
  itemsPerPage: number;
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedJurusan: string;
  onJurusanChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearAll: () => void;
};

const FilterBar: React.FC<FilterBarProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
  selectedJurusan,
  onJurusanChange,
  searchQuery,
  onSearchChange,
  onClearAll,
}) => {
  return (
    <section className="flex justify-between flex-wrap gap-3 mb-4">
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          {[10, 25, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num} / halaman
            </option>
          ))}
        </select>

        <select
          value={selectedJurusan}
          onChange={onJurusanChange}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="Semua">Semua Jurusan</option>
          {jurusanList.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Cari nama atau NIM..."
          value={searchQuery}
          onChange={onSearchChange}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm w-48"
        />
      </div>

      <button
        onClick={onClearAll}
        className="bg-primer px-3 py-2 text-white rounded-md hover:bg-hover transition ease-in-out duration-300"
      >
        Hapus Semua Data
      </button>
    </section>
  );
};

export default FilterBar;
