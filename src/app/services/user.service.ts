import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userUrl = "users";
  // headers = new HttpHeaders({
  //   Authorization: `Bearer ${token}`
  // });

  constructor(private _http: HttpClient, private _config: ConfigService) { }

  public getUserCarts(pageSize: number, page: number): Observable<BaseResponse> {
    return this._http.get<BaseResponse>(
      `${this.getApiUrl()}\\cart`,
      {
        params: new HttpParams()
          .set('pageSize', pageSize)
          .set('page', page)
      }
    );
  }

  public getApiUrl() {
    return `${this._config.apiUrl}${this._userUrl}`;
  }
}
