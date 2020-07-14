import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, responseType?: any, headers?: any): Promise<any> {
    return this.http.get(url, responseType).toPromise()
      .then(response => response)
      .catch((err) => {
        console.log(err);
      });
  }


  post(url: string, body: any, authorization?: any): Promise<any> {
    let headersObject = new HttpHeaders();
    headersObject = headersObject.set('Content-Type', 'application/json');
    headersObject = headersObject.set('Authorization', 'Basic ' + btoa(`${authorization.userName}:${authorization.password}`));

    const httpOptions = {
      headers: headersObject
    };
    return this.http.post(url, body, httpOptions).toPromise()
      .then(response => response)
      .catch((err) => {
        console.log(err);
      });
  }

  getImageBlob(url, params?: any | { [param: string]: string | string[] }) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

     return this.http.get(url, {params: params, headers: headers, responseType: 'blob'}).toPromise()
      .then(res => res)
      .catch((err) => {
        console.log(err);
      });
    
    }
}

