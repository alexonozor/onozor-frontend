import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {

  constructor(
    private injector: Injector,
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    const snackBar = this.injector.get(MatSnackBar);
    const router = this.injector.get(Router);
if (error instanceof HttpErrorResponse) {
    // Server error happened
      if (!navigator.onLine) {
        // No Internet connection
        snackBar.open('No Internet Connection', 'Close');
        return;
      }
      // Http Error
      if (error.status !== 401) { // don't raise alarm if error is 404 let interceptor do the work.
      console.log(error);
        snackBar.open('Sorry, Onozor just expirenced a server error :(', 'reload');
        return;
      }
      return;
    } else {
      console.log(error);
      // Client Error Happend
      snackBar.open('Onozor has expirenced a run time error. :(', 'Close');
    }
  }
}
