import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';




@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public notification: NzNotificationService,
    public auth: AuthService,
    public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${this.auth.getToken()}`
      }
    });
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          this.router.navigate(['authenticate']);
          this.notification.create('error', 'Unauthorize', 'Your session has expired');
        }
      }
    });
  }
}
