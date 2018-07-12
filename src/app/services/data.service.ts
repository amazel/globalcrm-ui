import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable()
export class DataService {

  public actionUrl: string;

  constructor(private http: HttpClient) {
  }

  public getAll<T>(params?: Map<String, String>): Observable<T> {
    console.log('getting all', this.actionUrl);
    const options = this.getOptions(params);
    return this.http.get<T>(this.actionUrl, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getSingle<T>(id: number, params?: Map<String, String>): Observable<T> {

    const options = this.getOptions(params);
    return this.http.get<T>(this.actionUrl + '/' + id, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public save<T>(item: T, params?: Map<String, String>): Observable<T> {
    const json = JSON.stringify(item);
    const options = this.getOptions(params);
    console.log(json);
    return this.http.post<T>(this.actionUrl + '/new', json, options);
  }

  //
  // public update<T>(id: number, itemToUpdate: any): Observable<T> {
  //   return this.http
  //     .put<T>(this.actionUrl + id, JSON.stringify(itemToUpdate));
  // }

  public delete<T>(id: number): Observable<T> {

    return this.http.delete<T>(this.actionUrl + '/' + id);
  }

  private getOptions(params?: Map<String, String>) {

    console.log(params);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const object: any = {};
    if (params) {
      params.forEach(((value: string, key: string) => {
        object[key] = value;
      }));
    }

    const httpParams = new HttpParams({fromObject: object});

    const options = {
      params: httpParams,
      headers: headers
    };
    return options;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
