// MAHASISWA 4 – INTEGRATOR
// Tugas: Ambil data dari Vendor A, B, C → Normalisasi → Gabungkan → Kirim JSON standar

const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// URL Vendor ambil dari .env
const VENDOR_A = process.env.VENDOR_A;
const VENDOR_B = process.env.VENDOR_B;
const VENDOR_C = process.env.VENDOR_C;

// ==========================
// 1. Normalisasi Vendor A
// ==========================
// Contoh:
// { kd_produk: "A001", nm_brg: "Kopi", hrg: "15000", ket_stok: "ada" }

function fromVendorA(item) {
  const hargaAsli = Number(item.hrg);
  const hargaDiskon = hargaAsli * 0.9; // diskon 10%

  return {
    id: item.kd_produk,
    nama: item.nm_brg,
    harga_final: Math.round(hargaDiskon),   // integer
    status: item.ket_stok === "ada" ? "Tersedia" : "Habis",
    sumber: "Vendor A"
  };
}

// ==========================
// 2. Normalisasi Vendor B
// ==========================

function fromVendorB(item) {
  return {
    id: item.sku,
    nama: item.productName,
    harga_final: Math.round(item.price), // pastikan integer
    status: item.isAvailable ? "Tersedia" : "Habis",
    sumber: "Vendor B"
  };
}

// ==========================
// 3. Normalisasi Vendor C
// ==========================

function fromVendorC(item) {
  let namaProduk = item.details.name;
  const kategori = item.details.category;

  const harga = item.pricing.base_price + item.pricing.tax;

  if (kategori === "Food") {
    namaProduk += " (Recommended)";
  }

  return {
    id: String(item.id),
    nama: namaProduk,
    harga_final: Math.round(harga),   // integer
    status: item.stock > 0 ? "Tersedia" : "Habis",
    sumber: "Vendor C"
  };
}

// ==========================
// Endpoint Integrasi
// ==========================

app.get("/products", async (req, res) => {
  try {
    const dataA = await fetch(VENDOR_A).then(r => r.json());
    const dataB = await fetch(VENDOR_B).then(r => r.json());
    const dataC = await fetch(VENDOR_C).then(r => r.json());

    const hasilA = dataA.map(fromVendorA);
    const hasilB = dataB.map(fromVendorB);
    const hasilC = dataC.map(fromVendorC);

    const finalData = [...hasilA, ...hasilB, ...hasilC];

    res.json(finalData);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Gagal mengambil data vendor" });
  }
});

// ==========================
// Cek server
// ==========================

app.get("/", (req, res) => {
  res.send("Integrator Mahasiswa 4 aktif");
});

app.listen(PORT, () => console.log("RUNNING on port", PORT));
