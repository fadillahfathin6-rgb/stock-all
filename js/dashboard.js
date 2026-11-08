// Fokus ke produk pertama untuk demo
const produk = PRODUCTS[0];
document.getElementById('productName').textContent = produk.judul;

function renderStats() {
  const total = produk.stock.length;
  const tersedia = produk.stock.filter(s => s.status === 'available').length;
  const reserved = produk.stock.filter(s => s.status === 'reserved').length;
  const sold = produk.stock.filter(s => s.status === 'sold').length;

  document.getElementById('statsRow').innerHTML = `
    <div class="stat-card"><div class="num">${total}</div><div class="lbl">Total Stok</div></div>
    <div class="stat-card"><div class="num">${tersedia}</div><div class="lbl">Tersedia</div></div>
    <div class="stat-card"><div class="num">${reserved}</div><div class="lbl">Dipesan</div></div>
    <div class="stat-card"><div class="num">${sold}</div><div class="lbl">Terjual</div></div>
  `;
}

function renderTable() {
  const tbody = document.getElementById('stockTableBody');
  tbody.innerHTML = produk.stock.map(s => {
    const terkunci = s.status !== 'available';
    return `
      <tr>
        <td>#${s.id}</td>
        <td>${s.detail}</td>
        <td><span class="status ${s.status}">${s.status}</span></td>
        <td>
          <button class="btn btn-sm btn-edit" onclick="editStok(${s.id})"
            ${terkunci ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>Edit</button>
          <button class="btn btn-sm btn-del" onclick="hapusStok(${s.id})"
            ${terkunci ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>Hapus</button>
        </td>
      </tr>
    `;
  }).join('');
}

function editStok(id) {
  const item = produk.stock.find(s => s.id === id);
  if (item.status !== 'available') {
    alert('Stok sedang dipesan/terjual — tidak bisa diedit!');
    return;
  }
  const baru = prompt('Edit detail akun:', item.detail);
  if (baru && baru.trim()) {
    item.detail = baru.trim();
    simpanData();
    renderTable();
    alert('✅ Stok berhasil diperbarui!');
  }
}

function hapusStok(id) {
  const item = produk.stock.find(s => s.id === id);
  if (item.status !== 'available') {
    alert('Stok sedang dipesan/terjual — tidak bisa dihapus!');
    return;
  }
  if (confirm('Hapus stok ini?')) {
    // soft-delete: ubah status jadi sold untuk demo (bisa diganti 'hidden')
    produk.stock = produk.stock.filter(s => s.id !== id);
    simpanData();
    renderStats();
    renderTable();
  }
}

function tambahStok() {
  const detail = prompt('Detail akun baru (misal: Mythic 20 ⭐ • 70 skin):');
  if (!detail || !detail.trim()) return;
  const newId = Math.max(...produk.stock.map(s => s.id), 100) + 1;
  produk.stock.push({ id: newId, detail: detail.trim(), status: 'available' });
  simpanData();
  renderStats();
  renderTable();
  alert('✅ Stok baru ditambahkan!');
}

// Init
renderStats();
renderTable();
