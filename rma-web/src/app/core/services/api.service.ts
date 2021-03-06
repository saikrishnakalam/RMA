import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    // return this.http.get(`${environment.api_url}${path}`, { params, headers })
    //   .pipe(catchError(this.formatErrors));
    return this.http.get(`http://localhost:8081/${path}`, { params, headers })
      .pipe(catchError(this.formatErrors));
  }

  getFromJSON(path: string): Observable<any> {
    return this.http.get(path)
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    }

    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
