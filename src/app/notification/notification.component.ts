import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';


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
    public _auth: AuthService
  ) {
    this.getNotifications();
  }

  ngOnInit() {
    this.currentUser = this._auth.getCurrentUser();
  }

  getNotifications() {
    this.activatedRoute.data.pipe(map(data => data.activities)).subscribe(resp => {
      this.notifications = resp.activities;
    }, err => {
      throw err;
    });
  }


  goToQuestionComment(notification) {
    this.router.navigate(['posts', notification.reason.question.slug],
    { queryParams: { notification: notification.id, comment_id: notification.trackable.commentable_id} });
  }


  goToQuestionOrAnswerComment(notification) {
    this.router.navigate(['posts', notification.reason.question.slug],
    { queryParams: { notification: notification.id, answer_id: notification.trackable.commentable_id} });
  }



}
