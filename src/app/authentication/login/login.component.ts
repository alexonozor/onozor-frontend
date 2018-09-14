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
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from '../auth.service';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;
  componentName: String = 'login';


  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public router: Router,
    private message: NzMessageService,
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
      email: [null, [Validators.required, Validators.email]],
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
            this.loginForm.reset({email: ''});
          } else {
            this.router.navigate(['/']);
          }
        }, err => {
          this.isSubmited = false;
          this.isThereError = true;
        }
      );
    }
  }

  closeForm() {
    this.location.back();
  }


}
