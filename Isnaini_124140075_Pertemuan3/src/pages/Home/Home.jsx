import { useEffect, useMemo, useState } from 'react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

export default function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const stats = useBookStats(books);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('semua');
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = 'Daftar Buku | Rak Buku';
  }, []);

  const filteredBooks = useMemo(() => books.filter((book) => {
    const query = search.toLowerCase().trim();
    const matchesSearch = book.title.toLowerCase().includes(query)
      || book.author.toLowerCase().includes(query);
    return matchesSearch && (status === 'semua' || book.status === status);
  }), [books, search, status]);

  function saveBook(book) {
    if (editingBook) {
      updateBook(editingBook.id, book);
      setEditingBook(null);
    } else {
      addBook(book);
    }
    setShowForm(false);
  }

  function editBook(book) {
    setEditingBook(book);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function removeBook(id) {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      deleteBook(id);
      if (editingBook?.id === id) {
        setEditingBook(null);
        setShowForm(false);
      }
    }
  }

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Koleksi pribadi Isna</p>
          <h1>Semua koleksi buku Isna,<br />ada disini.</h1>
        </div>
        {!showForm && <button className="primary-btn" onClick={() => setShowForm(true)} type="button">＋ Tambah buku</button>}
      </section>

      <section className="stats-row" aria-label="Ringkasan buku">
        <div className="stat-card"><span className="stat-icon">▤</span><p className="stat-label">Total buku</p><strong>{stats.total}</strong></div>
        <div className="stat-card"><span className="stat-icon">⌁</span><p className="stat-label">Sedang dibaca</p><strong>{stats.baca}</strong></div>
        <div className="stat-card"><span className="stat-icon">♡</span><p className="stat-label">Wishlist</p><strong>{stats.beli}</strong></div>
      </section>

      {showForm && <BookForm initialBook={editingBook} onSave={saveBook} onCancel={() => { setEditingBook(null); setShowForm(false); }} />}

      <section className="panel">
        <div className="panel-top">
          <h2 className="panel-heading">Koleksi buku</h2>
          <span>{filteredBooks.length} buku ditemukan</span>
        </div>
        <BookFilter search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} />
        <BookList books={filteredBooks} onEdit={editBook} onDelete={removeBook} />
      </section>
    </>
  );
}