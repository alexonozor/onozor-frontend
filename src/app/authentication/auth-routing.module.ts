import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoginLinkComponent } from './login-link.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-token/:token', component: LoginLinkComponent }
];

export const AuthRoutes = RouterModule.forChild(routes);
