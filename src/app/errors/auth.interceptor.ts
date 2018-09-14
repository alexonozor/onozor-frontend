
import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../authentication/login/login.component';
import { MatSnackBar } from '@angular/material';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public dialog: MatDialog,
    public notification: NzNotificationService,
    public auth: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${this.auth.getToken()}`
      }
    });
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // this.router.navigate(['authenticate']);
          this.notification.create('error', 'Unauthorize', 'Please login');
          this.dialog.open(LoginComponent);
        } else if (err.status === 404) {
          this.snackBar.open('No record found for your request :(', 'reload');
          this.router.navigate(['']);
          return;
        }
      }
    }));
  }
}
