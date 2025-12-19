# Project Integrator Vendor (Mahasiswa 4)

## Identitas
- Nama          : Avingka Aulia
- Peran         : Lead Integrator
- NIM           : 362458302045
- Mata Kuliah   : Interoperabilitas



## Deskripsi Project
Project ini bertujuan untuk mengintegrasikan data dari tiga vendor berbeda
menggunakan konsep **API Gateway**.

Setiap vendor memiliki struktur data yang berbeda, sehingga diperlukan proses
**normalisasi data** agar dapat digunakan secara seragam oleh client.

## Aturan Normalisasi
- Semua harga dikonversi ke integer
- Vendor A mendapat diskon 10%
- Produk kategori Food dari Vendor C diberi label `(Recommended)`
- Status stok diseragamkan menjadi `Tersedia` atau `Habis`

## Endpoint
GET /products  
Mengambil data gabungan dari semua vendor.

## Deployment
URL Vercel: https://interoperability-integrator.vercel.app/products

## Anggota Tim
- Vendor A - Rahma Titis
- Vendor B - Shavira Nindya
- Vendor C - Martha Dwi
- Integrator - Avingka Aulia