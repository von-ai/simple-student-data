type NIM = string & { readonly brand: unique symbol };
export const jurusanList = [
  'Teknik Sipil',
  'Teknik Mesin',
  'Teknik Perkapalan',
  'Teknik Elektro',
  'Teknik Arsitektur',
  'Teknik Geologi',
  'Teknik Industri',
  'Teknik Kelautan',
  'Teknik Sistem Perkapalan',
  'Teknik Perencanaan Wilayah Kota',
  'Teknik Pertambangan',
  'Teknik Informatika',
  'Teknik Lingkungan',
  'Teknik Metalurgi dan Material',
  'Teknik Geodesi',
] as const;

type Jurusan = (typeof jurusanList)[number];

type Angkatan = number & { _type?: 'Angkatan' };

export function makeNim(value: string): boolean {
  value = value.toUpperCase();
  return /^[A-Z]\d{9}$/.test(value);
}

type Email = string & { _type?: 'Email' };

export function makeEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

type IPK = number & { _type?: 'IPK' };

export function makeIPK(value: number): IPK {
  if (value < 0 || value > 4) throw new Error('IPK harus antara 0.00 dan 4.00');
  return Number(value.toFixed(2)) as IPK;
}

export type Input = {
  nama: string;
  nim: NIM;
  jurusan: Jurusan;
  angkatan: Angkatan;
  email: Email;
  ipk: IPK;
  catatan: string | '';
  image: File;
};
