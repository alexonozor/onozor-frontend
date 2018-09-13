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
      snackBar.open('Sorry, Onozor just detect a Serve Error :(', 'reload');
      return;
    } else {
      // Client Error Happend
      snackBar.open('Onozor has expirence a run time error. :(', 'reload');
    }
  }
}
