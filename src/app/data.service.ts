import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class DataService {

  public actionUrl: string;

  constructor(private http: HttpClient) {
  }

  public getAll<T>(parent: string, parentValue: string): Observable<T> {

    const options = {
      params: new HttpParams().set(parent, parentValue),
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<T>(this.actionUrl, options);
  }

  public getSingle<T>(id: number, params?: Map<String, String>): Observable<T> {
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

    return this.http.get<T>(this.actionUrl + '/' + id, options);
  }

  public add<T>(itemName: string): Observable<T> {
    const toAdd = JSON.stringify({ItemName: itemName});

    return this.http.post<T>(this.actionUrl, toAdd);
  }

  public update<T>(id: number, itemToUpdate: any): Observable<T> {
    return this.http
      .put<T>(this.actionUrl + id, JSON.stringify(itemToUpdate));
  }

  public delete<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.actionUrl + id);
  }
}
