export function saveStorageData(token: string, expirationDate: Date): void {
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', expirationDate.toISOString());
}

export function clearStorageData(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
}
