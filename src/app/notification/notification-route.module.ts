import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification.component';
import { GetNotificationRouterResolver } from './notification-resolver.service';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: NotificationComponent, resolve: { activities: GetNotificationRouterResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRouteModule { }
