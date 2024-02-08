const userKey = 'car-app-user'; 

export const setUser = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(
    decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    )
  );
  
  localStorage.setItem(userKey, JSON.stringify(payload));
  console.log('setUser payload', payload);
}

export const getUser = (): any => {
  const user = localStorage.getItem(userKey);
  console.log('getUser', user);
  if (user) {
    return JSON.parse(user);
  } else {
    return {  }
  }
}
