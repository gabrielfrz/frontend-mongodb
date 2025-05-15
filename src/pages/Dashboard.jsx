import React, { useEffect, useState } from 'react';
import { getProtectedData } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProtectedData();
      if (res.error || res.message === 'Unauthorized') {
        toast.error('Sessão expirada ou token inválido');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setData(res);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logout realizado');
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>Área Logada</h2>
      <button onClick={handleLogout}>Logout</button>
      <pre style={{ textAlign: 'left', marginTop: '20px' }}>
        {data ? JSON.stringify(data, null, 2) : 'Carregando dados...'}
      </pre>
    </div>
  );
};

export default Dashboard;
