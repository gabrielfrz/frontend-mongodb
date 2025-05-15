import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);

    if (res.token) {
      toast.success('Cadastro realizado com sucesso!');
      navigate('/login');
    } else {
      toast.error(res.error || 'Erro ao cadastrar');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <br /><br />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <br /><br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
