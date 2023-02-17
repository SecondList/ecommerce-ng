import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _AuthUrl = "users";

  constructor(private _http: HttpClient, private _config: ConfigService) { }

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


}
