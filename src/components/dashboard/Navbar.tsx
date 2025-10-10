'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    if (confirm('Yakin ingin keluar?')) router.push('/login');
  };

  return (
    <>
      <section className="flex justify-between w-full h-auto bg-white shadow-xs py-5 px-10 rounded-md">
        <span className="text-primer font-black text-2xl ">Data Mahasiswa</span>
        <button
          onClick={handleLogout}
          className="bg-primer text-white font-medium px-5 py-2 rounded-md hover:bg-hover transition duration-300 ease-in-out "
        >
          Logout
        </button>
      </section>
    </>
  );
};

export default Navbar;
