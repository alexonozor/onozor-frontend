import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../authentication/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreatePostComponent } from '../../posts/create-post/create-post.component';
import { NotificationService } from '../../notification/notification.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() drawer: any;
  currentUser: any;
  isLoging: any;
  notification_counter: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  isDesktop$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
  .pipe(
    map(result => result.matches)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    public dialog: MatDialog,
    public _notification: NotificationService
  ) {
    this.auth.isCurrentUser();
  }

  logout() {
    this.isLoging = false;
    this.auth.logout();
  }

  ngOnInit() {
    this.listenToCurrentUser();
    this.listenToNotificationUpdate();
  }

  listenToNotificationUpdate() {
    this._notification.listiningToUpdateCount.subscribe(res => {
      this.notification_counter = res;
    }, err => {
      throw err;
    });
  }

  listenToCurrentUser() {
    this.auth.listenToCurrentUserChanges.subscribe(res => {
      this.isLoging = res;
    });
    this.currentUser = this.auth.getCurrentUser();
  }


}
