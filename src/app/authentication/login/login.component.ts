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
import { AuthService } from '../auth.service';


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
    private message: NzMessageService,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  login() {
    this.isSubmited = true;
    this._authService.login(this.loginForm.value)
      .subscribe(res => {
          if (res.success) {
            this.message.success(res.message);
            this.isSubmited = false;
            this.loginForm.reset({email: null});
          } else {
            this.router.navigate(['/']);
          }
        }, err => {
          console.log(err);
          this.isSubmited = false;
          this.isThereError = true;
        }
      );
  }


}
