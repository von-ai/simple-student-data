INSTRUKSI SETUP & PENGGUNAAN APLIKASI DATA MAHASISWA


1. PERSYARATAN

---

- Node.js v18.x atau lebih baru (https://nodejs.org/)
- pnpm (https://pnpm.io/)
- Git (https://git-scm.com/)

2. CLONE REPOSITORY

---

Buka terminal/command prompt, lalu jalankan:
git clone https://github.com/von-ai/mid-pem-web.git
cd mid-pem-web

3. INSTALL DEPENDENCIES

---

Jika menggunakan pnpm (direkomendasikan):
pnpm install

Atau jika menggunakan npm:
npm install

Atau yarn:
yarn install

Atau bun:
bun install

4. JALANKAN DEVELOPMENT SERVER

---

Jalankan perintah berikut sesuai package manager Anda:
pnpm run dev # atau
npm run dev # atau
yarn dev # atau
bun dev

Buka browser ke http://localhost:3000

5. STRUKTUR FOLDER UTAMA

---

- .next/ : Folder build otomatis Next.js (abaikan)
- public/ : File statis (logo, svg, dsb)
- src/
  app/ : Routing utama Next.js (page.tsx, layout.tsx, globals.css)
  components/
  dashboard/ : Komponen dashboard (Navbar, Heading, FormField, TabelData, dsb)
  pages/ : Halaman utama (DashboardPage, LoginPage)
  types/ : Tipe data TypeScript (form-fields-type.ts, tabel-data-type.ts)
- declarations.d.ts : Deklarasi tipe global
- next.config.ts : Konfigurasi Next.js
- postcss.config.mjs : Konfigurasi PostCSS (Tailwind)
- eslint.config.mjs : Konfigurasi ESLint
- package.json : Daftar dependensi & script
- README.md : Dokumentasi singkat

6. FITUR UTAMA

---

- Login sederhana (username: admin, password: 12345)
- CRUD data mahasiswa (tambah, edit, hapus, filter, search)
- Export data ke JSON, CSV, PDF
- Import data dari file CSV
- Pagination & filter berdasarkan jurusan/angkatan
- Validasi form (NIM, email, IPK, dsb)
- Upload foto mahasiswa (opsional)

7. CATATAN PENTING

---

- Data mahasiswa hanya tersimpan di memori (state React), tidak ada database.
- Jika ingin reset data, refresh halaman atau gunakan tombol "Hapus Semua Data".

8. TECH STACK

---

- **Framework:** Next.js (React 18)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context/State
- **Build Tool:** pnpm (bisa juga npm/yarn/bun)
- **Linting:** ESLint
- **Export/Import Data:** jsPDF

9. KONTAK & KONTRIBUSI

zuhdimiral@gmail.com

Jika ada pertanyaan, silakan hubungi pemilik repo ini.

=========================================================
