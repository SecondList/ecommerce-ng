import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartUrl = "carts";

  constructor(private _http: HttpClient, private _config: ConfigService) { }

  public addToCart(productId: number, orderQty: number): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(
      `${this.getApiUrl()}\\additem`,
      {
        productId, orderQty
      }
    );
  }

  public updateOrderQty(productId: number, orderQty: number) {
    return this._http.put<BaseResponse>(
      `${this.getApiUrl()}\\updateorderqty`,
      {
        productId, orderQty
      }
    );
  }

  public deleteFromCart(productId: number) {
    return this._http.delete<BaseResponse>(
      `${this.getApiUrl()}\\deleteitem`, { body: { productId } }
    );
  }

  public clearCart() {
    return this._http.delete<BaseResponse>(
      `${this.getApiUrl()}\\clearcart`
    );
  }

  public getApiUrl() {
    return `${this._config.apiUrl}${this._cartUrl}`;
  }
}
