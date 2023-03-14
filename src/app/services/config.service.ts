import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public apiUrl = "http://www.ecommerceskl14.somee.com/api/";
  // public apiUrl = "https://localhost:7204/api/";
  constructor() { }
}
