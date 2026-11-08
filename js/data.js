// ===== DATA PRODUK =====
// stock: array unit akun (status: available | reserved | sold)
const PRODUCTS = [
  {
    id: 1, judul: 'Akun Mobile Legends Mythic', kategori: 'game',
    emoji: '🎮', harga: 450000, penjual: 'GameStoreID',
    deskripsi: 'Akun ML rank Mythic, 120 hero, 85 skin termasuk 5 epic. Email & password siap ganti.',
    stock: [
      { id: 101, detail: 'Mythic 25 ⭐ • 85 skin', status: 'available' },
      { id: 102, detail: 'Mythic 12 ⭐ • 60 skin', status: 'available' },
      { id: 103, detail: 'Mythic 30 ⭐ • 100 skin', status: 'sold' },
    ]
  },
  {
    id: 2, judul: 'Akun Netflix Premium 1 Bulan', kategori: 'streaming',
    emoji: '🎬', harga: 35000, penjual: 'StreamMart',
    deskripsi: 'Akun Netflix sharing 1 profil, garansi 30 hari.',
    stock: [
      { id: 201, detail: 'Profil 1 • garansi 30hr', status: 'available' },
      { id: 202, detail: 'Profil 2 • garansi 30hr', status: 'reserved' },
    ]
  },
  {
    id: 3, judul: 'Akun Instagram 5K Followers', kategori: 'sosmed',
    emoji: '📱', harga: 250000, penjual: 'SosmedHub',
    deskripsi: 'Akun IG real followers 5K, niche lifestyle, email aktif.',
    stock: [
      { id: 301, detail: '5.200 followers • niche lifestyle', status: 'available' },
    ]
  },
  {
    id: 4, judul: 'Lisensi Canva Pro 1 Tahun', kategori: 'software',
    emoji: '💻', harga: 75000, penjual: 'SoftKeyStore',
    deskripsi: 'Lisensi Canva Pro legal 1 tahun, bisa upgrade akun sendiri.',
    stock: [
      { id: 401, detail: 'Lisensi 1 tahun • email sendiri', status: 'available' },
      { id: 402, detail: 'Lisensi 1 tahun • email sendiri', status: 'available' },
      { id: 403, detail: 'Lisensi 1 tahun • email sendiri', status: 'available' },
    ]
  }
];

// ===== HELPER: hitung stok tersedia =====
function stokTersedia(produk) {
  return produk.stock.filter(s => s.status === 'available').length;
}

// Simpan ke localStorage agar edit di dashboard persisten
function simpanData() {
  localStorage.setItem('akunmarket_products', JSON.stringify(PRODUCTS));
}
function muatData() {
  const saved = localStorage.getItem('akunmarket_products');
  if (saved) {
    const parsed = JSON.parse(saved);
    PRODUCTS.length = 0;
    parsed.forEach(p => PRODUCTS.push(p));
  }
}
muatData();
