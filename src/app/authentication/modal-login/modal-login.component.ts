import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;
  componentName: String = 'login';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public router: Router,
    private _authService: AuthService,
    private location: Location,
    public snackBar: MatSnackBar,
  ) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  isDesktop$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
  .pipe(
    map(result => result.matches)
  );

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  login() {
    if (this.loginForm.valid) {
    this.isSubmited = true;
    this._authService.login(this.loginForm.value)
      .subscribe(res => {
          if (res.success) {
            this.snackBar.open(res.message, 'close', { duration: 5000 } );
            this.isSubmited = false;
            this.loginForm.reset('');
            this.loginForm.markAsPristine();
          } else {
            this.router.navigate(['/']);
          }
        }, err => {
          this.isSubmited = false;
          this.isThereError = true;
          throw err;
        }
      );
    }
  }

  closeForm() {
    this.location.back();
  }
}
