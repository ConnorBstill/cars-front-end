import { API_URL } from '../environment';
import { getJwt } from './JwtService';

export const createCar = async(body: any) => {
  const response = await fetch(`${API_URL}/car`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
}

export const getUserCars = async () => {
  const response = await fetch(`${API_URL}/car`, {
    method: 'GET',
    headers: { 
      Authorization: `Bearer ${getJwt()}`
    }
  });

  const data = await response.json();

  return data;
}

export const deleteCar = async (carId: any) => {
  const response = await fetch(`${API_URL}/car/${carId}`, {
    method: 'DELETE',
    headers: { 
      Authorization: `Bearer ${getJwt()}`
    }
  });

  const data = await response.json();

  return data;
}