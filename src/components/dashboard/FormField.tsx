'use client';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Input,
  makeEmail,
  makeIPK,
  makeNim,
  jurusanList,
} from '../types/form-fields-type';

type FormFieldProps = {
  onSubmitData: (data: Input) => void;
  existingData: Input[];
  editingData?: Input | null;
};

const FormField: React.FC<FormFieldProps> = ({
  onSubmitData,
  existingData,
  editingData,
}) => {
  const { register, handleSubmit, reset } = useForm<Input>();

  useEffect(() => {
    if (editingData) {
      reset(editingData);
    } else {
      reset({
        nama: '',
        nim: '',
        jurusan: undefined,
        angkatan: undefined,
        email: '',
        ipk: 0,
        catatan: '',
        image: undefined,
      });
    }
  }, [editingData, reset]);

  const onSubmit: SubmitHandler<Input> = (data) => {
    if (editingData) {
      onSubmitData(data);
      reset();
      return;
    }

    const nimExists = existingData.some(
      (item) => item.nim.trim().toLowerCase() === data.nim.trim().toLowerCase()
    );

    if (nimExists) {
      alert(`NIM ${data.nim} sudah terdaftar!`);
      return;
    }

    const file = (data.image as unknown as FileList)?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      data.image = imageUrl as any;
    }
    console.log('form data:', data);
    onSubmitData(data);
    reset();
  };

  return (
    <section className="bg-white w-full p-10 rounded-md shadow-xs">
      <h2 className="text-xl font-semibold text-primer mb-8 border-b pb-3">
        Formulir Data Mahasiswa
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-primer">Nama</label>
            <input
              {...register('nama')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primer"
              placeholder="Masukkan Nama Mahasiswa"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-primer">NIM</label>
            <input
              {...register('nim', {
                validate: (value) => makeNim(value) || 'Format NIM tidak valid',
              })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primer"
              placeholder="D121231021"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-primer">Program Studi</label>
            <select
              {...register('jurusan')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primer"
            >
              <option value="">Pilih Program Studi</option>
              {jurusanList.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-primer">Angkatan</label>
            <select
              {...register('angkatan', { valueAsNumber: true })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pritext-primer"
            >
              <option value="">Pilih Angkatan</option>
              {Array.from({ length: 10 }, (_, i) => 2019 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-primer">Email</label>
            <input
              {...register('email', {
                validate: (value) =>
                  makeEmail(value) || 'Format email tidak valid',
              })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pritext-primer"
              placeholder="univ@ac.id"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-primer">IPK</label>
            <input
              type="number"
              step="0.01"
              {...register('ipk', {
                valueAsNumber: true,
                validate: (value) => {
                  if (value < 0 || value > 4)
                    return 'IPK harus antara 0.00 dan 4.00';
                  return true;
                },
              })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pritext-primer"
              placeholder="3.40"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-primer">Foto</label>
            <input
              type="file"
              {...register('image')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-primer file:text-white hover:file:bg-hover transition ease-in-out duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-primer">Catatan</label>
            <input
              {...register('catatan')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pritext-primer"
              placeholder="Opsional"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end mt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-5 py-2 rounded-md transition duration-300"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-primer hover:bg-hover text-white font-medium px-5 py-2 rounded-md transition duration-300"
          >
            {editingData ? 'Perbarui' : 'Submit'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormField;
