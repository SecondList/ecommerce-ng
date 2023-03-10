import { JwtHelperService } from '@auth0/angular-jwt';

export function jwtHelperFactory() {
  return new JwtHelperService();
}