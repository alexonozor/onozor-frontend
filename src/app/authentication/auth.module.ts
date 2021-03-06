import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutes } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginLinkComponent } from './login-link.component';
import { MyOwnCustomMaterialModule } from '../material';
import { ModalLoginComponent } from './modal-login/modal-login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    MyOwnCustomMaterialModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    LoginLinkComponent,
    ModalLoginComponent
  ],
  entryComponents: [ModalLoginComponent],
  exports: [LoginComponent, ModalLoginComponent]
})
export class AuthModule { }
