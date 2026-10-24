import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import BookList from '../components/BookList/BookList';

const books = [
  { id: '1', title: 'Bumi', author: 'Tere Liye', status: 'milik' },
  { id: '2', title: 'Laut', author: 'Leila S. Chudori', status: 'baca' }
];

describe('BookList', () => {
  it('menampilkan judul dan penulis buku', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Bumi')).toBeInTheDocument();
    expect(screen.getByText('Leila S. Chudori')).toBeInTheDocument();
  });

  it('menampilkan pesan saat daftar kosong', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Belum ada buku di sini')).toBeInTheDocument();
  });

  it('memanggil fungsi edit dan hapus', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<BookList books={books} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Edit' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Hapus' })[0]);
    expect(onEdit).toHaveBeenCalledWith(books[0]);
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});