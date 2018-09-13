import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoginLinkComponent } from './login-link.component';
import { LoginUserCantVistLoginPageGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LoginComponent, canActivate: [LoginUserCantVistLoginPageGuard] },
  { path: 'login-token/:token', component: LoginLinkComponent }
];

export const AuthRoutes = RouterModule.forChild(routes);
