import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function StatCard({ label, value, icon }) {
  return <div className="stat-card"><span className="stat-icon">{icon}</span><p className="stat-label">{label}</p><strong>{value}</strong></div>;
}
StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired
};

export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);
  useEffect(() => { document.title = 'Statistik | Rak Buku'; }, []);

  const rows = [
    { key: 'milik', label: 'Dimiliki', count: stats.milik },
    { key: 'baca', label: 'Dibaca', count: stats.baca },
    { key: 'beli', label: 'Ingin dibeli', count: stats.beli }
  ];

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Buku-buku Isna</p>
          <h1>Buku-buku<br />yang isna punya.</h1>
          <p>Semua catatan buku Isna ada di sini.</p>
        </div>
      </section>
      <section className="stats-row">
        <StatCard label="Total buku" value={stats.total} icon="▤" />
        <StatCard label="Sudah dimiliki" value={stats.milik} icon="✓" />
        <StatCard label="Sedang dibaca" value={stats.baca} icon="⌁" />
      </section>
      <div className="stats-page-grid">
        <section className="panel">
          <div className="panel-top"><h2 className="panel-heading">Status koleksi</h2><span>{stats.total} buku</span></div>
          {stats.total === 0 ? (
            <div className="empty-state"><div className="empty-icon">▤</div><h3>Belum ada statistik</h3><p>Tambahkan buku untuk melihat ringkasannya.</p></div>
          ) : (
            <div className="breakdown">
              {rows.map((row) => (
                <div className="breakdown-row" key={row.key}>
                  <span>{row.label}</span>
                  <div className="track"><div className="track-fill" style={{ width: `${(row.count / stats.total) * 100}%` }} /></div>
                  <strong>{row.count}</strong>
                </div>
              ))}
            </div>
          )}
        </section>
        <aside className="tip-card">
          <p className="eyebrow">Pengingat Kecil</p>
          <h2>Baca sesuai<br />mood aja.</h2>
          <p>Ngga harus langsung tamat satu buku. Baca kalau lagi ada waktu dan mood. Masih banyak buku yang bisa dibaca, jadi nikmati aja prosesnya.</p>
        </aside>
      </div>
    </>
  );
}