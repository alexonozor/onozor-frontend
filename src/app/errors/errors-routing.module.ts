import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorsComponent, Errors404Component, ErrorsInternetConnectionComponent } from './errors.component';

const routes: Routes = [
  { path: 'errors', pathMatch: 'full', component: ErrorsComponent },
  { path: '404', component: ErrorsInternetConnectionComponent },
  { path: '**', pathMatch: 'full', component: Errors404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }

