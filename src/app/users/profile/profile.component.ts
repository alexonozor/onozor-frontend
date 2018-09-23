import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../posts/posts.service';
import { Location } from '@angular/common';
import { AuthService } from '../../authentication/auth.service';
import { UserService } from '../../users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  currentUser: any;
  user: any;
  profileNavLink: Array<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public location: Location,
    private _postService: PostsService,
    private _userService: UserService,
    private snackBar: MatSnackBar,
    public auth: AuthService,
    public _notificationService: NotificationService
  ) {
    this.currentUser = this.auth.getCurrentUser();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  navigateToSettings() {
    this.router.navigate(['users/settings']);
  }

  ngOnInit() {
    this.getPost();
  }


  getPost() {
    this.activatedRoute.data.pipe(map(data => data.user)).subscribe(resp => {
      this.user = resp.user;
      this.profileNavLink = [
        { name: 'QUESTIONS', link: 'questions'},
        { name: 'ANSWERS', link: 'answers'},
        { name: 'FAVOURITES', link: 'favourites'},
        { name: 'FOLLOWERS', link: 'followers', count: this.user.followers },
        { name: 'FOLLOWING', link: 'following', count: this.user.followings },
      ];
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

  ngAfterViewInit() {
    this.activatedRoute.fragment.subscribe((fragment: string) => {
      if (fragment === 'answers') {
        setTimeout(() => {
          document.getElementById('answers').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      }
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      const isParams = Object.keys(params).length > 0;
      if (isParams && params.read === 'false') {
        this._notificationService.markAsSeen(params.notification).subscribe(resp => {
        }, err => {
          throw err;
        });
      }
    });
  }

}
