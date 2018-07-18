import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutes } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes
  ],
  declarations: [
    SignupComponent,
    LoginComponent
  ]
})
export class AuthModule { }
