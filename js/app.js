const grid = document.getElementById('productGrid');
const filterBar = document.getElementById('filterBar');
const searchInput = document.getElementById('searchInput');
let kategoriAktif = 'all';
let kataCari = '';

function renderProduk() {
  const hasil = PRODUCTS.filter(p => {
    const cocokKategori = kategoriAktif === 'all' || p.kategori === kategoriAktif;
    const cocokCari = p.judul.toLowerCase().includes(kataCari.toLowerCase());
    return cocokKategori && cocokCari;
  });

  if (hasil.length === 0) {
    grid.innerHTML = '<p style="color:#889">Tidak ada produk ditemukan.</p>';
    return;
  }

  grid.innerHTML = hasil.map(p => {
    const tersedia = stokTersedia(p);
    return `
      <div class="product-card" onclick="location.href='product.html?id=${p.id}'">
        <div class="product-img">${p.emoji}</div>
        <div class="product-body">
          <span class="badge">${p.kategori}</span>
          <h3>${p.judul}</h3>
          <p class="seller">oleh ${p.penjual} ✅</p>
          <p class="price">Rp ${p.harga.toLocaleString('id-ID')}</p>
          <p class="stok-info ${tersedia === 0 ? 'stok-habis' : ''}">
            ${tersedia === 0 ? 'Stok habis' : `Stok: ${tersedia} tersedia`}
          </p>
        </div>
      </div>
    `;
  }).join('');
}

// Filter kategori
filterBar.addEventListener('click', e => {
  if (!e.target.classList.contains('chip')) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  e.target.classList.add('active');
  kategoriAktif = e.target.dataset.cat;
  renderProduk();
});

// Search
searchInput.addEventListener('input', e => {
  kataCari = e.target.value;
  renderProduk();
});

renderProduk();
