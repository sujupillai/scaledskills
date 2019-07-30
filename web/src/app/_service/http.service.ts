import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _HttpClient: HttpClient) { }
  httpCall(url, method, data, params) {
    if (method == 'POST') {
      return this._HttpClient.post<any>(url, data, { params: params });
    } else if (method == 'GET') {
      if (params) {
        return this._HttpClient.get<any[]>(url, { params: params });
      } else {
        return this._HttpClient.get<any[]>(url);
      }
    }
  }
}
