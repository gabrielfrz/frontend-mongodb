import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {
  getMoviesBooks,
  createMovieBook,
  updateMovieBook,
  deleteMovieBook,
} from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    type: 'movie',
    title: '',
    authorOrDirector: '',
    genre: '',
    releaseYear: '',
    completed: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const data = await getMoviesBooks();
      if (data.error || data.message === 'Unauthorized') {
        toast.error('Token inválido. Faça login novamente.');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      setItems(data);
    } catch (err) {
      toast.error('Erro ao carregar itens');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['type', 'title', 'authorOrDirector', 'genre', 'releaseYear'];
    for (const field of requiredFields) {
      if (!form[field]) return toast.error(`Campo obrigatório: ${field}`);
    }
    const dataToSend = {
      ...form,
      releaseYear: parseInt(form.releaseYear),
    };
    if (isNaN(dataToSend.releaseYear)) {
      return toast.error('Ano de lançamento inválido.');
    }
    try {
      if (editingId) {
        await updateMovieBook(editingId, dataToSend);
        toast.success('Item atualizado com sucesso!');
      } else {
        await createMovieBook(dataToSend);
        toast.success('Item criado com sucesso!');
      }
      setForm({ type: 'movie', title: '', authorOrDirector: '', genre: '', releaseYear: '', completed: false });
      setEditingId(null);
      fetchItems();
    } catch {
      toast.error('Erro ao salvar item');
    }
  };

  const handleEdit = (item) => {
    setForm({
      type: item.type,
      title: item.title,
      authorOrDirector: item.authorOrDirector,
      genre: item.genre,
      releaseYear: item.releaseYear.toString(),
      completed: item.completed,
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar?')) return;
    try {
      await deleteMovieBook(id);
      toast.success('Item deletado!');
      fetchItems();
    } catch {
      toast.error('Erro ao deletar');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logout realizado');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h2>🎬 Minha Biblioteca</h2>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>

        <form onSubmit={handleSubmit} className="form-section">
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option value="movie">🎥 Filme</option>
            <option value="book">📘 Livro</option>
          </select>
          <input type="text" placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input type="text" placeholder="Autor ou Diretor" value={form.authorOrDirector} onChange={e => setForm({ ...form, authorOrDirector: e.target.value })} />
          <input type="text" placeholder="Gênero" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} />
          <input type="text" placeholder="Ano de Lançamento" value={form.releaseYear} onChange={e => setForm({ ...form, releaseYear: e.target.value })} />
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="completed"
              checked={form.completed}
              onChange={e => setForm({ ...form, completed: e.target.checked })}
            />
            <label htmlFor="completed" className="custom-checkbox">
              {form.completed ? '✅ Finalizado' : '⏳ Em andamento'}
            </label>
          </div>

          <button type="submit">{editingId ? 'Atualizar' : 'Criar'}</button>
        </form>

        <h3>📂 Seus itens</h3>
        {loading ? (
          <p>Carregando...</p>
        ) : items.length === 0 ? (
          <p>Nenhum item encontrado.</p>
        ) : (
          <ul className="item-list">
            {items.map(item => (
              <li key={item._id} className="item">
                <div className="item-title">{item.title} ({item.type})</div>
                <div className="item-meta">{item.authorOrDirector} | {item.genre} | {item.releaseYear}</div>
                <div className="item-status">{item.completed ? '✅ Finalizado' : '⏳ Em andamento'}</div>
                <button onClick={() => handleEdit(item)} className="edit-button">Editar</button>
                <button onClick={() => handleDelete(item._id)} className="delete-button">Deletar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
