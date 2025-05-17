import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);
      if (res.message === 'User registered successfully') {
        toast.success('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        toast.error(res.message || 'Erro ao cadastrar');
      }
    } catch (err) {
      toast.error('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crie sua conta</h2>
        <p>Cadastre-se para salvar e organizar seus filmes e livros favoritos.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="primary-btn">Cadastrar</button>
        </form>
        <button onClick={() => navigate('/')} className="secondary-btn">
          ← Voltar para a Home
        </button>
      </div>
    </div>
  );
};

export default Register;
