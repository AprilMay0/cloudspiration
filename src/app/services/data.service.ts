import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://cloudspiration-e784.restdb.io/';
  head = new HttpHeaders({'x-apikey': '5b2ff53e0c346a20d90a5e10'})

  constructor(private http:HttpClient) { 
    
  }

  getText() {
    let queryUrl = this.url + 'rest/inspirations';
    return this.http.get<any[]>(queryUrl, {headers: this.head})
      .pipe(catchError(this.handleError));
  }

  getClouds() {
    let queryUrl = this.url + 'rest/clouds';
    return this.http.get<any[]>(queryUrl, {headers: this.head})
      .pipe(catchError(this.handleError));
  }

  getCloud(id) {
    let queryUrl = this.url + 'media/' + id;
    return this.http.get(queryUrl, {headers: this.head})
      .pipe(catchError(this.handleError));
  }


  private handleError(error: Response) {
    if (error.status === 400) 
      return throwError(new BadInput(error.json()))

    if (error.status === 404) 
      return throwError(new NotFoundError());

    return throwError(new AppError(error));
  } 
}
