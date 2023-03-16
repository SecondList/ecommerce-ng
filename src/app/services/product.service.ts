import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseResponse } from '../models/base-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _productUrl = "products";

  constructor(private _http: HttpClient, private _config: ConfigService) { }

  public getProducts(pageSize: number, page: number): Observable<BaseResponse> {
    return this._http.get<BaseResponse>(
      this.getApiUrl(),
      {
        params: new HttpParams()
          .set('pageSize', pageSize)
          .set('page', page)
      }
    );
  }

  public getProduct(productId: number): Observable<BaseResponse> {
    return this._http.get<BaseResponse>(
      `${this.getApiUrl()}\\${productId}`,
    )
  }

  public createProduct(newProduct: Product): Observable<Product> {
    return this._http.post<Product>(
      this.getApiUrl(), newProduct
    );
  }

  public getApiUrl() {
    return `${this._config.apiUrl}${this._productUrl}`;
  }
}
