import PropTypes from 'prop-types';

const statusLabels = {
  milik: 'Sudah dimiliki',
  baca: 'Sedang dibaca',
  beli: 'Ingin dibeli'
};

function BookItem({ book, onEdit, onDelete }) {
  return (
    <article className="book-item">
      <div className="book-cover" aria-hidden="true">{book.title.trim().charAt(0).toUpperCase()}</div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <span className={`status status-${book.status}`}>{statusLabels[book.status]}</span>
      </div>
      <div className="item-actions">
        <button className="small-btn" type="button" onClick={() => onEdit(book)}>Edit</button>
        <button className="small-btn delete" type="button" onClick={() => onDelete(book.id)}>Hapus</button>
      </div>
    </article>
  );
}
BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">▤</div>
        <h3>Belum ada buku di sini</h3>
        <p>Ubah pencarian atau tambahkan buku isna</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  );
}
BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};