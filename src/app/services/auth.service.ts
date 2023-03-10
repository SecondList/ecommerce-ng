import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _AuthUrl = "users";

  constructor(private _http: HttpClient, private _config: ConfigService, private cookieService: CookieService, private jwtHelper: JwtHelperService) { }

  public login(email: string, password: string): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(
      `${this._config.apiUrl}${this._AuthUrl}\\login`,
      {
        email, password
      }
    );
  }

  public register(email: string, password: string, confirmPassword: string): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(
      `${this._config.apiUrl}${this._AuthUrl}\\register`,
      {
        email, password, confirmPassword
      }
    );
  }

  public isAuthenticated(token: any = null): boolean {
    if (token === null) {
      token = this.cookieService.get('userToken');
    }
    // Check whether the token is expired and return
    // true or false
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      return false;
    }
  }
}
