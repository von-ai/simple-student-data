'use client';
import React, { useState, useEffect } from 'react';
import { Input, jurusanList } from '../types/form-fields-type';
import { Filter } from '../types/tabel-data-type';

type TabelDataProps = {
  data: Input[];
  onClearAll?: () => void;
  onDataChange?: (newData: Input[]) => void;
};

const TabelData: React.FC<TabelDataProps> = ({
  data,
  onClearAll,
  onDataChange,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJurusan, setSelectedJurusan] = useState<string>('Semua');
  const [selectedAngkatan, setSelectedAngkatan] = useState<number | 'Semua'>(
    'Semua'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [localData, setLocalData] = useState<Input[]>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = localData.filter((mhs) => {
    const matchJurusan =
      selectedJurusan === 'Semua' || mhs.jurusan === selectedJurusan;

    const matchAngkatan =
      selectedAngkatan === 'Semua' || mhs.angkatan === selectedAngkatan;

    const matchSearch =
      mhs.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mhs.nim.toLowerCase().includes(searchQuery.toLowerCase());

    return matchJurusan && matchAngkatan && matchSearch;
  });

  const handleItemPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleJurusan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJurusan(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    if (confirm('Ingin Menghapus Semua Data?')) {
      setLocalData([]);
      if (onClearAll) onClearAll();
      if (onDataChange) onDataChange([]); // <-- update parent
    }
  };

  const handleAngkatan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'Semua' ? 'Semua' : Number(e.target.value);
    setSelectedAngkatan(value);
    setCurrentPage(1);
  };

  let sortedData = [...filteredData];
  const count: number = filteredData.length;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // hapus terpilih
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = () => {
    if (selectedRows.size === 0) return;
    if (!confirm('Yakin ingin menghapus data yang terpilih?')) return;

    setLocalData((prev) => {
      const newData = prev.filter((_, idx) => !selectedRows.has(idx));
      if (onDataChange) onDataChange(newData); // <-- update parent juga
      return newData;
    });

    setSelectedRows(new Set());
  };

  //Sorting nama
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Input;
    direction: 'asc' | 'desc';
  } | null>(null);
  const handleSort = (key: keyof Input) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  //sorting nama
  if (sortConfig) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }

  const currentData = sortedData.slice(startIndex, endIndex);

  return (
    <section className="bg-white w-full p-8 rounded-md shadow-xs">
      <h2 className="text-xl font-semibold text-primer mb-5 border-b pb-2">
        Data Mahasiswa
      </h2>

      <section className="flex justify-between">
        <div className="flex gap-3">
          <span className="border-2 border-primer px-3 py-2 rounded-md">
            Jumlah Data: {count}
          </span>

          <select
            value={itemsPerPage}
            onChange={handleItemPage}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <select
            value={selectedJurusan}
            onChange={handleJurusan}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            <option value="Semua">Jurusan</option>
            {jurusanList.map((v) => (
              <option value={v} key={v}>
                {v}
              </option>
            ))}
          </select>

          <select
            value={selectedAngkatan}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            onChange={handleAngkatan}
          >
            <option value="Semua">Angkatan</option>
            {Array.from({ length: 10 }, (_, i) => 2019 + i).map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col-2 gap-3">
          <input
            type="text"
            placeholder="Cari nama atau NIM..."
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm w-48"
          />
          <button
            className="bg-primer px-3 py-2 text-white rounded-md hover:bg-hover transition ease-in-out duration-300"
            onClick={handleClearAll}
          >
            Hapus Semua Data
          </button>
        </div>
      </section>

      {filteredData.length === 0 ? (
        <p className="text-gray-500 text-sm italic pt-3">
          Belum ada data yang dimasukkan...
        </p>
      ) : (
        <div className="py-3">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primer text-white">
                <th className="py-2 px-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.size === currentData.length &&
                      currentData.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(
                          new Set(currentData.map((_, i) => i + startIndex))
                        );
                      } else {
                        setSelectedRows(new Set());
                      }
                    }}
                  />
                </th>
                <th className="py-2 px-3 text-left">No</th>
                <th
                  className="py-2 px-3 text-left cursor-pointer"
                  onClick={() => handleSort('nama')}
                >
                  {sortConfig?.key === 'nama'
                    ? sortConfig.direction === 'asc'
                      ? '▲'
                      : '▼'
                    : ''}
                  Nama{' '}
                </th>
                <th className="py-2 px-3 text-left">NIM</th>
                <th className="py-2 px-3 text-left">Jurusan</th>
                <th className="py-2 px-3 text-left">Angkatan</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">IPK</th>
                <th className="py-2 px-3 text-left">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((mhs, idx) => {
                const globalIdx = startIndex + idx;
                return (
                  <tr
                    key={globalIdx}
                    className={`${
                      idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100`}
                  >
                    <td className="py-2 px-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(globalIdx)}
                        onChange={() => handleSelectRow(globalIdx)}
                      />
                    </td>
                    <td className="py-2 px-3">{globalIdx + 1}</td>
                    <td className="py-2 px-3">{mhs.nama}</td>
                    <td className="py-2 px-3">{mhs.nim}</td>
                    <td className="py-2 px-3">{mhs.jurusan}</td>
                    <td className="py-2 px-3">{mhs.angkatan}</td>
                    <td className="py-2 px-3">{mhs.email}</td>
                    <td className="py-2 px-3">{mhs.ipk}</td>
                    <td className="py-2 px-3">{mhs.catatan}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <section className="flex justify-between">
        {/* Pagination Control */}
        <div className="flex  gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-primer text-white hover:bg-hover'
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-primer text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-primer text-white hover:bg-hover'
            }`}
          >
            Next
          </button>
        </div>

        <button
          className="bg-primer px-3 py-2 text-white rounded-md hover:bg-hover transition ease-in-out duration-300"
          onClick={handleDeleteSelected}
        >
          Hapus Terpilih
        </button>
      </section>
    </section>
  );
};

export default TabelData;
