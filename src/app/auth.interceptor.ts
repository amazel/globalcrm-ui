import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

export class AuthInterceptor implements HttpInterceptor {
  private tokenSession = 'token';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);

    const request = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem(this.tokenSession)
      }
    });
    return next.handle(request);
  }

}
