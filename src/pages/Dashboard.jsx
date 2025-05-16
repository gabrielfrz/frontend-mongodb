import React, { useEffect, useState } from 'react';
import { getProtectedData } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProtectedData();

        if (res.message === 'Unauthorized' || res.error) {
          toast.error('Sessão expirada ou token inválido');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setData(res);
        }
      } catch (error) {
        toast.error('Erro ao carregar dados protegidos');
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
      <div style={{ marginTop: '30px' }}>
        {data ? (
          <pre style={{ textAlign: 'left' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
