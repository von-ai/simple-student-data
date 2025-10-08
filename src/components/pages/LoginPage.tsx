'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

type LoginForm = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const router = useRouter();
  const admin = 'admin';
  const password = '12345';

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    if (data.username === admin && data.password === password) {
      router.push('/');
    }
  };

  return (
    <section className="w-full h-auto bg-white p-6 max-w-md mx-auto mt-20 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">Masuk</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Username</label>
          <input
            type="text"
            {...register('username', { required: 'Username wajib diisi' })}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password wajib diisi' })}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-primer text-white px-4 py-2 rounded-md hover:bg-hover transition"
        >
          Masuk
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
