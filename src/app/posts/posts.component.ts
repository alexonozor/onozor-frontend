import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './posts.service';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { AuthService } from '../authentication/auth.service';
import { UiUpdateService } from './ui-update.service';
import smoothscroll from 'smoothscroll-polyfill';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
  showComment: Boolean = false;
  sharePost: Boolean = false;
  private sub: any;
  public post: any;
  public loading: Boolean = true;
  public newAnswerReciver: Object = {};
  isCurrentUser: Boolean = false;
  currentUser: any;
  public favourite: Boolean = true;
  postUrL: String;
  componentName: String = 'post';
  title: String = 'questions';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public location: Location,
    private _postService: PostsService,
    public notification: NzNotificationService,
    public auth: AuthService,
    public _uiUpdateService: UiUpdateService
  ) {
    smoothscroll.polyfill();
    this.postUrL = this.router.url;
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit() {
    this.getPost();
    this.toggleComment();
    this.toggleShare();
  }

  getPost() {
    this.activatedRoute.data.pipe(map(data => data.post)).subscribe(resp => {
      this.post = resp.question;
      this.favourite = this.post.favourited;
      this.loading = false;
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
  }

  goToCommunity(slug) {
    this.router.navigate(['/communities', slug]);
  }


  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  updateAnswers(event) {
    this.newAnswerReciver = event;
  }

  toggleComment() {
    this._uiUpdateService.listenToToggleComment.subscribe(res => {
      if (res) {
        if (this.sharePost) {
          this.sharePost = !this.sharePost;
        }
        this.showComment = !this.showComment;
      }
    });
  }

  toggleShare() {
    this._uiUpdateService.listenToToggleShared.subscribe(res => {
      if (res) {
        if (this.showComment) {
          this.showComment = !this.showComment;
        }
        this.sharePost = !this.sharePost;
      }
    });
  }
}
