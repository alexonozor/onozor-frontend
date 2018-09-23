
import {of as observableOf,  Observable, timer } from 'rxjs';

import {catchError,  map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { NotificationService } from './notification.service';



@Injectable()
// export class GetNotificationRouterResolver implements Resolve<any> {
//   constructor(
//     private router: Router,
//     private _notifications: NotificationService
//   ) { }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     // const slug = route.params['slug'];
//     return this._notifications.getNotifications();
//   }
// }


export class GetNotificationRouterResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _notifications: NotificationService
  ) { }

  resolve() {
    return this._notifications.getNotifications();
  }
}
