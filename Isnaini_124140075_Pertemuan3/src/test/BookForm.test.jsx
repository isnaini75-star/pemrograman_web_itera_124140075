import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm';

describe('BookForm', () => {
  it('menampilkan input judul dan penulis', () => {
    render(<BookForm onSave={vi.fn()} />);
    expect(screen.getByLabelText(/judul buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument();
  });

  it('memberi pesan saat judul dan penulis kosong', () => {
    render(<BookForm onSave={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /simpan buku/i }));
    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument();
  });

  it('mengirim data yang sudah diisi', () => {
    const onSave = vi.fn();
    render(<BookForm onSave={onSave} />);
    fireEvent.change(screen.getByLabelText(/judul buku/i), { target: { value: 'Bumi' } });
    fireEvent.change(screen.getByLabelText(/penulis/i), { target: { value: 'Tere Liye' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan buku/i }));
    expect(onSave).toHaveBeenCalledWith({ title: 'Bumi', author: 'Tere Liye', status: 'milik' });
  });

  it('bisa memilih status buku', () => {
    render(<BookForm onSave={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/status buku/i), { target: { value: 'baca' } });
    expect(screen.getByLabelText(/status buku/i)).toHaveValue('baca');
  });
});