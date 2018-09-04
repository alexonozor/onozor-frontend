import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../posts/posts.service';
import { Location } from '@angular/common';
import { AuthService } from '../../authentication/auth.service';
import { UserService } from '../../users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
      console.log(err);
    });

  }

}
