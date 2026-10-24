import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const blankBook = { title: '', author: '', status: 'milik' };

export default function BookForm({ initialBook, onSave, onCancel }) {
  const [form, setForm] = useState(blankBook);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialBook ? {
      title: initialBook.title,
      author: initialBook.author,
      status: initialBook.status
    } : blankBook);
    setErrors({});
  }, [initialBook]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Judul buku wajib diisi.';
    if (!form.author.trim()) nextErrors.author = 'Nama penulis wajib diisi.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSave({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status
    });
    setForm(blankBook);
    setErrors({});
  }

  return (
    <section className="panel form-panel" aria-labelledby="form-title">
      <div className="form-heading">
        <h2 id="form-title">{initialBook ? 'Edit buku' : 'Tambah buku baru'}</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="title">Judul buku</label>
            <input id="title" name="title" value={form.title} onChange={handleChange}
              className={errors.title ? 'invalid' : ''} aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined} placeholder="Contoh: Laut Bercerita" />
            {errors.title && <p id="title-error" className="error-text">{errors.title}</p>}
          </div>
          <div className="field">
            <label htmlFor="author">Penulis</label>
            <input id="author" name="author" value={form.author} onChange={handleChange}
              className={errors.author ? 'invalid' : ''} aria-invalid={Boolean(errors.author)}
              aria-describedby={errors.author ? 'author-error' : undefined} placeholder="Nama penulis" />
            {errors.author && <p id="author-error" className="error-text">{errors.author}</p>}
          </div>
          <div className="field">
            <label htmlFor="status">Status buku</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              <option value="milik">Sudah dimiliki</option>
              <option value="baca">Sedang dibaca</option>
              <option value="beli">Ingin dibeli</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          {initialBook && <button type="button" className="secondary-btn" onClick={onCancel}>Batal</button>}
          <button type="submit" className="primary-btn">{initialBook ? 'Simpan perubahan' : 'Simpan buku'}</button>
        </div>
      </form>
    </section>
  );
}

BookForm.propTypes = {
  initialBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};
BookForm.defaultProps = { initialBook: null, onCancel: () => {} };