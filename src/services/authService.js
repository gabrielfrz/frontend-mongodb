const API_URL = 'https://backend-express-eight-ashen.vercel.app';

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
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
};
