import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response';
import { ProductCategory } from '../models/product-category';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private _productCategoryUrl = "productcategories";

  
  constructor(private _http: HttpClient, private _config: ConfigService) { }

  public getProductCategories(): Observable<BaseResponse> {
    return this._http.get<BaseResponse>(
      this.getApiUrl()
    );
  }

  public getProductsByCategory(categoryId: number, pageSize: number, page: number): Observable<BaseResponse> {
    return this._http.get<BaseResponse>(
      `${this.getApiUrl()}\\${categoryId}\\products`,
      {
        params: new HttpParams()
          .set('pageSize', pageSize)
          .set('page', page)
      }
    );
  }

  public createProductCategory(newProductCategory: ProductCategory): Observable<ProductCategory> {
    return this._http.post<ProductCategory>(
      this.getApiUrl(), newProductCategory
    );
  }

  public getApiUrl(){
    return `${this._config.apiUrl}${this._productCategoryUrl}`;
  }
}
