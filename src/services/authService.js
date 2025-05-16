const API_URL = 'https://backend-express-eight-ashen.vercel.app';

// 🔐 AUTH
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getProtectedData = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/protected/secureExampleRoute`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

// 📚 MOVIESBOOKS CRUD
export const getMoviesBooks = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/moviesbooks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const createMovieBook = async (data) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/moviesbooks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateMovieBook = async (id, data) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/moviesbooks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteMovieBook = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/moviesbooks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
