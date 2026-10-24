import PropTypes from 'prop-types';

export default function BookFilter({ search, onSearchChange, status, onStatusChange }) {
  return (
    <div className="toolbar">
      <div className="search-wrap">
        <span aria-hidden="true">⌕</span>
        <input aria-label="Cari buku" value={search} onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari judul atau penulis..." />
      </div>
      <select aria-label="Filter status" value={status} onChange={(event) => onStatusChange(event.target.value)}>
        <option value="semua">Semua status</option>
        <option value="milik">Sudah dimiliki</option>
        <option value="baca">Sedang dibaca</option>
        <option value="beli">Ingin dibeli</option>
      </select>
    </div>
  );
}
BookFilter.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['semua', 'milik', 'baca', 'beli']).isRequired,
  onStatusChange: PropTypes.func.isRequired
};