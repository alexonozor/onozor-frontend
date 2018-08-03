import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;


  constructor(
    private fb: FormBuilder,
    public router: Router,
    public _tokenService: Angular2TokenService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  login() {
    this.isSubmited = true;
    this._tokenService.signIn(this.loginForm.value)
      .subscribe(
        res => {
          if (localStorage.getItem('redirectTo')) {
            this.router.navigateByUrl(localStorage.getItem('redirectTo'));
          } else {
            this.router.navigate(['/']);
          }
        },
        err => {
          this.isSubmited = false;
          const error = err.json();
          this.isThereError = true;
          if (error) {
            this.message.error(error.errors[0], { nzDuration: 5000 });
          }
        }
      );
  }


}
