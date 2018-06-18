import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {
  private tokenSession = 'token';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('REQUEST!', req);

    const request = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem(this.tokenSession)
      }
    });
    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          console.log('RESPONSE!', evt);
          // console.log('---> status:', evt.status);
        }
      })
    );

  }
}
