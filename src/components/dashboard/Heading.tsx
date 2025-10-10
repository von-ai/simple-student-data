'use client';
import React, { useRef } from 'react';
import { Input } from '../types/form-fields-type';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { usePapaParse } from 'react-papaparse';

type HeadingProps = {
  data: Input[];
  onImport: (importedData: Input[]) => void;
};

const Heading: React.FC<HeadingProps> = ({ data, onImport }) => {
  const total: number = data.length;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const prodiCount = data.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.jurusan] = (acc[curr.jurusan] || 0) + 1;
    return acc;
  }, {});

  const prodiText = Object.entries(prodiCount)
    .map(([jurusan, count]) => `${jurusan}(${count})`)
    .join(', ');

  const avgIPK =
    total > 0
      ? (data.reduce((sum, mhs) => sum + mhs.ipk, 0) / total).toFixed(2)
      : 0;

  const handleExportJSON = () => {
    if (data.length === 0) return alert('Tidak ada data untuk diexport!');

    const jsonData = JSON.stringify(data, null, 2); // null,2 biar rapi
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data_mahasiswa.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  //Eksport CSV
  const handleExportCSV = () => {
    if (data.length === 0) return alert('Tidak ada data untuk diexport!');

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((field) => {
            const val = (row as any)[field];
            const str = val != null ? String(val).replace(/"/g, '""') : '';
            return `"${str}"`;
          })
          .join(',')
      ),
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data_mahasiswa.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  //print pdf
  const handlePrint = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(16);
    doc.text('Daftar Data Mahasiswa', pageWidth / 2, 15, { align: 'center' });

    autoTable(doc, {
      startY: 25,
      head: [['Nama', 'NIM', 'Jurusan', 'Angkatan', 'Email', 'IPK', 'Catatan']],
      body: data.map((mhs) => [
        mhs.nama,
        mhs.nim,
        mhs.jurusan,
        mhs.angkatan,
        mhs.email,
        mhs.ipk,
        mhs.catatan,
      ]),
    });

    doc.save('data_mahasiswa.pdf');
  };

  //import excel
  const { readString } = usePapaParse();
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text !== 'string') return;

      readString(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const importedData: Input[] = results.data.map((row: any) => ({
            nama: row.nama || '',
            nim: row.nim || '',
            jurusan: row.jurusan || '',
            angkatan: Number(row.angkatan) || 0,
            email: row.email || '',
            ipk: Number(row.ipk) || 0,
            catatan: row.catatan || '',
            image: new File([], 'placeholder.png'),
          }));
          onImport(importedData);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        },
      });
    };
    reader.readAsText(file);
    console.log(data);
  };

  return (
    <>
      <section className="flex justify-between w-full h-auto bg-white shadow-xs py-5 px-10 rounded-md">
        <div className="flex gap-3">
          <span className="border-2 px-3 py-2 border-primer rounded-md">
            Total: {total}
          </span>
          <span className="border-2 px-3 py-2 border-primer rounded-md">
            Prodi: {prodiText || '-'}
          </span>
          <span className="border-2 px-3 py-2 border-primer rounded-md">
            Rata-rata IPK: {avgIPK}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportJSON}
            className="border-2 px-3 py-2 border-primer rounded-md hover:bg-primer hover:text-white transition ease-in-out duration-300"
          >
            Export JSON
          </button>
          <button
            onClick={handleExportCSV}
            className="border-2 px-3 py-2 border-primer rounded-md hover:bg-primer hover:text-white transition ease-in-out duration-300"
          >
            Export CSV
          </button>
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImport}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="border-2 px-3 py-2 border-primer rounded-md hover:bg-primer hover:text-white transition ease-in-out duration-300"
          >
            Import
          </button>
          <button
            onClick={handlePrint}
            className="border-2 px-3 py-2 border-primer rounded-md hover:bg-primer hover:text-white transition ease-in-out duration-300"
          >
            Print
          </button>
        </div>
      </section>
    </>
  );
};

export default Heading;
