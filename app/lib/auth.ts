const ADMIN_USER = 'admin@greengarden.de';
const ADMIN_PASS = 'demo1234'; // In production: use bcrypt + database

export function validateLogin(email: string, password: string): boolean {
  return email === ADMIN_USER && password === ADMIN_PASS;
}

export function setAdminSession(email: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_session', JSON.stringify({
      email,
      loginTime: new Date().toISOString(),
    }));
  }
}

export function getAdminSession() {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('admin_session');
    return session ? JSON.parse(session) : null;
  }
  return null;
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_session');
  }
}

export function isAdminLoggedIn(): boolean {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('admin_session');
  }
  return false;
}
