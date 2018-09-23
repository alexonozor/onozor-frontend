import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRouteModule } from './notification-route.module';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { GetNotificationRouterResolver } from './notification-resolver.service';
import { MyOwnCustomMaterialModule } from './../material';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    NotificationRouteModule,
    MyOwnCustomMaterialModule,
    MomentModule
  ],
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ],
  entryComponents: [
    NotificationComponent
  ],
  providers: [
    NotificationService,
    GetNotificationRouterResolver
  ]
})
export class NotificationModule { }
