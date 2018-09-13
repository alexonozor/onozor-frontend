import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isCurrentUser()) {
        return true;
      }
      this.router.navigate(['authenticate']);
      this.snackBar.open('Please sign before you continue', 'close', {
        duration: 3000
      });
      return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginUserCantVistLoginPageGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isCurrentUser()) {
      this.snackBar.open('You are already logged in.', 'close', {
        duration: 3000
      });
      return false;
    }
    return true;
  }
}
