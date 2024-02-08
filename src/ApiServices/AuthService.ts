import { API_URL } from '../environment';

interface AuthRequestBody {
  username: string;
  password: string;
  userIsAdmin?: boolean;
}

export const register = async (body: AuthRequestBody) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
}

export const LogIn = async (body: AuthRequestBody) => {
  const response = await fetch(`${API_URL}/log-in`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
}