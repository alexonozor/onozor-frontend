import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../authentication/auth.service';
import { CommunityService } from '../community.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Community {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  subscribe: boolean;
  subscribers_count: number;
  question_count: number;
  link: { questions: string };
  created_at: Date;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  currentUser: any;
  community: Community;
  meta: any;
  componentName: String = 'community';
  loading: Boolean = true;
  slug: any;
  loadingcommunities: Boolean = true;
  posts: Array<any> = ['loading', 'loading', 'loading', 'loading', 'loading'];
  loadingPosts = false;
  loadingAnswer: Boolean = true;



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
    this.getCommunity();
  }

  getCommunity() {
    this.activatedRoute.data.pipe(map(data => data.community)).subscribe(resp => {
      this.community = resp.category;
      this.getCommunityQuestions();
    }, err => {
      throw err;
    });
  }

  getCommunityQuestions() {
    this.communityService.getCommunityQuestions(this.community.slug).subscribe(res => {
      this.loading = false;
      this.loadingPosts = false;
      this.loadingAnswer = false;
      this.meta = res.meta;
      this.posts = res.questions;
    }, err => {
      throw err;
    });
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
      throw err;
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
      throw err;
    });
  }

  onScroll(page) {
    if (page && this.meta.total_page !== page) {
      if (this.loadingAnswer) { return; }
      this.loadingAnswer = true;
      this.communityService.getCommunityQuestions(this.community.slug, page).subscribe(res => {
        this.loadingAnswer = false;
        this.meta = res.meta;
        res.questions.map(item => {
          this.posts.push(item);
        });
      }, err => {
        throw err;
      });
    }
  }

}
