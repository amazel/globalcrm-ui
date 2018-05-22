import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Configuration} from '../app.configuration';
import {UserAuth} from '../model/user-auth.model';
import * as JWT from 'jwt-decode';

@Injectable()
export class AuthService {
  private actionUrl: string;
  private userIdSession = 'userId';
  private tokenSession = 'token';

  constructor(private router: Router, private httpClient: HttpClient,
              private _configuration: Configuration) {
    this.actionUrl = _configuration.server + 'public/login';
  }

  public login(email: string, password: string) {
    const options = {
      params: new HttpParams()
        .set('email', email)
        .set('password', password),
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.httpClient.post(this.actionUrl, {}, options).subscribe(
      (response: UserAuth) => {
        this.setSession(response.jwtToken);
        this.router.navigate(['/']);
      },
      error => {
        console.error('LOGIN ERROR', error);
        this.router.navigate(['/login']);
      }
    );
  }

  private setSession(token: string) {
    localStorage.setItem(this.tokenSession, token);
    const decoded = JWT(token);
    if (decoded === null) {
      // deal with null
    }
    const decodedJWT = (decoded as any);
    console.log(decodedJWT);
    localStorage.setItem(this.userIdSession, decodedJWT.uid);
  }

  private getTokenExpirationDate(token): Date {
    if (token.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);
    return date;
  }

  public logout() {
    localStorage.removeItem(this.tokenSession);
    localStorage.removeItem(this.userIdSession);
  }

  public isAuthenticated() {
    const token = localStorage.getItem(this.tokenSession);
    return token != null && !this.isTokenExpired(token);
  }

  public isTokenExpired(token): boolean {
    const decoded = JWT(token);
    if (decoded === null) {
      // deal with null
    }
    const decodedJWT = (decoded as any);
    console.log(decodedJWT.exp);
    console.log(new Date().getTime() / 1000);
    return decodedJWT.exp < new Date().getTime() / 1000;
  }

}
