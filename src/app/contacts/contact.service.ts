import {Injectable} from '@angular/core';
import {Configuration} from '../app.configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class ContactService {

  private actionUrl: string;

  constructor(private http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.apiUrl + '/contacts';
  }

  public getAll<T>(accountId: string): Observable<T> {
    const options = {
      params: new HttpParams().set('accountId', accountId),
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<T>(this.actionUrl, options);
  }

  public getSingle<T>(id: number): Observable<T> {
    console.log('Getting contact: ' + id);
    const options = {
      params: new HttpParams().set('userId', '1'),
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<T>(this.actionUrl + '/' + id, options);
  }



}
