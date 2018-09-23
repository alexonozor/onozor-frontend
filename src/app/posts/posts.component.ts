import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './posts.service';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { AuthService } from '../authentication/auth.service';
import { NotificationService } from '../notification/notification.service';
import { UiUpdateService } from './ui-update.service';
import smoothscroll from 'smoothscroll-polyfill';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
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
  loadingSimilarQuestions: Boolean = false;
  similarsQuestions: Array<any> = [];

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
    public _uiUpdateService: UiUpdateService,
    public _notificationService: NotificationService
  ) {
    smoothscroll.polyfill();
    this.postUrL = this.router.url;
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit() {
    this.getPost();
    this.toggleComment();
    this.emmitNotificationCount();
  }

  showAnswerForm(post) {
    post.show_answer_form = false;
    setTimeout(() => {
      document.getElementById('answer-form-text').focus();
    }, 1000);
  }

  getPost() {
    this.activatedRoute.data.pipe(map(data => data.post)).subscribe(resp => {
      this.post = resp.question;
      this.favourite = this.post.favourited;
      this.loading = false;
      this.similarQuestions(this.post.slug);
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

  similarQuestions(slug) {
    this.loadingSimilarQuestions = true;
    this._postService.similarQuestions(slug).subscribe(res => {
      this.loadingSimilarQuestions = false;
      this.similarsQuestions = res;
    }, err => {
      throw err;
    });
  }

  ngAfterViewInit() {
    // check for fragment
    this.activatedRoute.fragment.subscribe((fragment: string) => {
      if (fragment && fragment === 'answers') {
        setTimeout(() => {
          document.getElementById('answers').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      }
    });

    // check for query params
    this.activatedRoute.queryParams.subscribe((params) => {
      setTimeout(() => {
        const scrollViewElement = document.getElementById(`answer-${params.answer_id}`);
        if (scrollViewElement) {
          scrollViewElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000);
      const isParams = Object.keys(params).length > 0;
      if (isParams && params.read === 'false') {
        this._notificationService.markAsSeen(params.notification).subscribe(resp => {
        }, err => {
          throw err;
        });
      }
    });
  }

  goToCommunity(slug) {
    this.router.navigate(['/communities', slug]);
  }

  gotToPost(slug) {
    this.router.navigate(['posts', slug], { fragment: 'post' });
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
