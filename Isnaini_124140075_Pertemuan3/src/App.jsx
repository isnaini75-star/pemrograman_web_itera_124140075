import { NavLink, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';

function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">r.</span>
          <span>Koleksi Buku Isna<span className="brand-dot">.</span></span>
        </NavLink>
        <nav aria-label="Navigasi utama">
          <NavLink to="/" end>Daftar buku</NavLink>
          <NavLink to="/stats">Statistik</NavLink>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">Ruang kecil untuk cerita yang kamu simpan.</footer>
    </div>
  );
}
Layout.propTypes = { children: PropTypes.node.isRequired };

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}