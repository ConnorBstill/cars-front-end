const jwtKey = 'car-app-jwt';

export const setJwt = (jwt: any) =>{
  localStorage.setItem(jwtKey, jwt);
}

export const getJwt = () => {
  const jwt = localStorage.getItem(jwtKey);

  return jwt;
}

export const removeJwt = () => {
  localStorage.removeItem(jwtKey);
}
