import { JwtHelperService } from '@auth0/angular-jwt';

export const isLoggedIn = (): string | null => {
  const token = localStorage.getItem("jwtToken");
  const helper = new JwtHelperService();
  if(token && helper.isTokenExpired(token)) {
    localStorage.setItem("jwtToken", '');
    return null;
  }
  if (token) return helper.decodeToken(token).sub;

  return null;
}
