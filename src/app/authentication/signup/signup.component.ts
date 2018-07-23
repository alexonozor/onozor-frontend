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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public _tokenService: Angular2TokenService,
    private message: NzMessageService
  ) {
    this.signupForm = this.fb.group({
      email: [null, [Validators.email]],
      password: [null, [Validators.required]],
      username:  [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  signup() {
    this.isSubmited = true;
    this._tokenService.registerAccount(this.signupForm.value)
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
            this.formErrors = error.errors.full_messages;
          }
        }
      );
  }

  afterClose() {
    this.isThereError = false;
  }


}
