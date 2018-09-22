import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: Array<any> = ['loading', 'loading'];
  currentUser: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public _auth: AuthService,
    public _notificationService: NotificationService
  ) {
    this.getNotifications();
    this.markAllAsSeen();
  }

  ngOnInit() {
    this.currentUser = this._auth.getCurrentUser();
    this.emmitNotificationCount();
  }

  getNotifications() {
    this.activatedRoute.data.pipe(map(data => data.activities)).subscribe(resp => {
      this.notifications = resp.activities;
    }, err => {
      throw err;
    });
  }

  emmitNotificationCount() {
    this._notificationService.notification_count().subscribe(res => {
      this._notificationService.emmitNotificationCount(res.notification_count);
    }, err => {
      throw err;
    });
  }


  goToQuestionComment(notification) {
    this.router.navigate(['posts', notification.reason.question.slug],
    { queryParams: {
      notification: notification.id,
      comment_id: notification.trackable.commentable_id,
      read: notification.read
    } });
  }


  goToQuestionOrAnswerComment(notification) {
    this.router.navigate(['posts', notification.reason.question.slug],
    { queryParams: {
      notification: notification.id,
      answer_id: notification.trackable.commentable_id,
      read: notification.read
    } });
  }


  goToQuestionAnswer(notification) {
    this.router.navigate(['posts', notification.reason.question.slug],
    { queryParams: {
      notification: notification.id,
      answer_id: notification.trackable.id,
      read: notification.read
    } });
  }

  goToQuestionVote(notification) {
    this.router.navigate(['posts', notification.reason.question.slug],
    { queryParams: {
      notification: notification.id,
      vote_id: notification.trackable.id,
      read: notification.read
    } });
  }

  goToAnswerVote(notification) {
    this.router.navigate(['posts', notification.reason.question.slug],
    { queryParams: { notification: notification.id, answer_id: notification.reason.answer,
      vote_id: notification.trackable.id,
      read: notification.read
    } });
  }

  goToFavouritedQuestion(notification) {
    this.router.navigate(['posts', notification.reason.question.slug],
    { queryParams: { notification: notification.id,
      fovorited_id: notification.trackable.id,
      read: notification.read
    } });
  }

  goToFollowerProfile(notification) {
    this.router.navigate(['users', notification.sender.slug],
      { queryParams: { notification: notification.id,
        read: notification.read
      } });
  }

  markAllAsRead() {
    this.notifications.forEach(item => {
      item.read = true;
    });
    this._notificationService.markAllAsRead({seen: true, read: true, read_at: Date.now}).subscribe(resp => {
      console.log('marked');
    }, err => {
      throw err;
    });
  }


  markAllAsSeen() {
    this._notificationService.markAllAsRead({seen: true}).subscribe(resp => {
      console.log('marked');
    }, err => {
      throw err;
    });
  }



}
