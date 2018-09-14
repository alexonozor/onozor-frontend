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
        snackBar.open('No Internet Connection', 'reload');
        return;
      }
      // Http Error
      if (error.status !== 401) { // don't raise alarm if error is 404 let interceptor do the work.
        snackBar.open('Sorry, Onozor just detect a Serve Error :(', 'reload');
      }
      return;
    } else {
      // Client Error Happend
      console.log(error);
      snackBar.open('Onozor has expirence a run time error. :(', 'reload');
    }
  }
}
