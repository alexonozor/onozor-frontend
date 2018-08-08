import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutes } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginLinkComponent } from './login-link.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    LoginLinkComponent
  ]
})
export class AuthModule { }
