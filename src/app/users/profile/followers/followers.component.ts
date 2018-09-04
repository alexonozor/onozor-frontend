import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../authentication/auth.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  currentUser: any;
  users: Array<any>;
  meta: any;
  componentName: String = 'post';
  loading = false;
  slug: any;
  loadingUsers: Boolean = true;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public location: Location,
    public auth: AuthService,
    public _userService: UserService
  ) {
    activatedRoute.parent.params.subscribe(params => {
      this.slug = params.slug;
    });
    this.currentUser = this.auth.getCurrentUser();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );



  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.activatedRoute.data.pipe(map(data => data.users)).subscribe(resp => {
      this.loading = false;
      this.loadingUsers = false;
      this.meta = resp.meta;
      this.users = resp.users;
    }, err => {
      console.log(err);
    });
  }


  onScroll(page) {
    if (page && this.meta.total_page !== page) {
      if (this.loadingUsers) { return; }
      this.loadingUsers = true;
      this._userService.getUserFollowers(this.slug, page).subscribe(res => {
        this.loadingUsers = false;
        this.meta = res.meta;
        res.users.map(item => {
          this.users.push(item);
        });
      }, err => {
      });
    }
  }

}
