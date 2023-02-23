import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response';
import { Card } from '../models/card';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private _checkoutUrl = "checkouts";

  constructor(private _http: HttpClient, private _config: ConfigService) { }

  public checkout(productIds: number[], firstName: string, lastName: string, receiptEmail: string, address1: string, city: string, state: string, postalCode: string, country: string, carrier: string, card: Card): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(
      `${this.getApiUrl()}`,
      {
        productIds, firstName, lastName, receiptEmail, address1, city, state, postalCode, country, carrier, card
      }
    );
  }

  public getApiUrl() {
    return `${this._config.apiUrl}${this._checkoutUrl}`;
  }
}
