export const storeAccessToken = (token: string) => {
  localStorage.setItem('ACCESS_TOKEN', token)
}

export const storeRefreshToken = (token: string) => {
  localStorage.setItem('REFRESH_TOKEN', token)
}

export const retrieveAccessToken = (): string | null => {
  return localStorage.getItem('ACCESS_TOKEN')
}

export const retrieveRefreshToken = (): string | null => {
  return localStorage.getItem('REFRESH_TOKEN')
}

export const storeUserProfile = (objectString: string) => {
  localStorage.setItem('USER', objectString)
}

export const retrieveUserProfile = () => {
  const obj = localStorage.getItem('USER');
  return obj ? JSON.parse(obj) : null;
}

export const checkIfTokenValid = () => {
  const obj = localStorage.getItem('USER');
  if (!obj) return false
  const { exp } = JSON.parse(obj)
  return new Date(exp * 1000) > new Date()
}

export const logoutUser = () => {
  localStorage.clear();
}