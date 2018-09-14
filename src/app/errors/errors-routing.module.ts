import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorsComponent, Errors404Component, ErrorsInternetConnectionComponent } from './errors.component';

const routes: Routes = [
  { path: 'errors', component: ErrorsComponent },
  { path: 'internet-error', component: ErrorsInternetConnectionComponent },
  { path: '**',  component: Errors404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }

