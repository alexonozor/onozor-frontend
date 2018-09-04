import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../authentication/auth.service';
import { CommunityService } from '../community.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  currentUser: any;
  communities: Array<any>;
  meta: any;
  componentName: String = 'communities';
  loading = false;
  slug: any;
  loadingcommunities: Boolean = true;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public location: Location,
    public auth: AuthService,
    public communityService: CommunityService,
    private snackBar: MatSnackBar
  ) {
    this.currentUser = this.auth.getCurrentUser();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );



  ngOnInit() {
    this.getCommunities();
  }

  getCommunities() {
    this.activatedRoute.data.pipe(map(data => data.communities)).subscribe(resp => {
      this.loading = false;
      this.loadingcommunities = false;
      this.meta = resp.meta;
      this.communities = resp.categories;
    }, err => {
      console.log(err);
    });
  }


  onScroll(page) {
    if (page && this.meta.total_page !== page) {
      if (this.loadingcommunities) { return; }
      this.loadingcommunities = true;
      this.communityService.getCommunities(page).subscribe(res => {
        this.loadingcommunities = false;
        this.meta = res.meta;
        res.categories.map(item => {
          this.communities.push(item);
        });
      }, err => {
      });
    }
  }

  unsubscribe(community) {
    community.subscribe = false;
    this.communityService.unsubscribe(community).subscribe(res => {
      if (res.status === 200) {
        this.snackBar.open(res.message, null, { duration: 2000 });
      } else {
        this.snackBar.open(res.errors, null, { duration: 2000 });
      }
    }, err => {
      this.snackBar.open('server error', null, { duration: 2000 });
    });
  }

  subscribe(community) {
    community.subscribe = true;
    this.communityService.subscribe(community).subscribe(res => {
      if (res.status === 200) {
        this.snackBar.open(res.message, null, { duration: 2000 });
      } else {
        this.snackBar.open(res.errors, null, { duration: 2000 });
      }
    }, err => {
      this.snackBar.open('server error', null, { duration: 2000 });
    });
  }

}
