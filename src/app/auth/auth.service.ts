import {Router} from '@angular/router';
import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserAuth} from '../model/user-auth.model';
import * as JWT from 'jwt-decode';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs/internal/Subscription';

@Injectable()
export class AuthService implements OnInit, OnDestroy {
  private actionUrl: string;
  private userIdSession = 'userId';
  private accountIdSession = 'accountId';
  private tokenSession = 'token';
  private httpSubscription: Subscription;

  constructor(
    private router: Router,
    private httpClient: HttpClient) {
    this.actionUrl = environment.server + 'public/login';
    console.log(this.actionUrl);
  }

  ngOnInit() {

  }

  public login(email: string, password: string) {
    console.log('login');
    const userAuth: UserAuth = new UserAuth();
    userAuth.email = email;
    userAuth.password = password;
    const options = {
      params: new HttpParams(),
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(this.actionUrl, userAuth, options);
  }

  public setSession(userAuth: UserAuth) {
    const decoded = JWT(userAuth.jwtToken);
    if (decoded === null) {
      // deal with null
    }
    const decodedJWT = (decoded as any);
    localStorage.setItem(this.tokenSession, userAuth.jwtToken);
    localStorage.setItem(this.accountIdSession, userAuth.accountId.toString());
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
    localStorage.removeItem(this.accountIdSession);
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
    return decodedJWT.exp < new Date().getTime() / 1000;
  }

  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();

  }

}
