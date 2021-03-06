import { Component, OnInit, Input } from '@angular/core';
import { FeedsService } from '../feeds/feeds.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UiUpdateService } from '../posts/ui-update.service';
import { PostsService } from '../posts/posts.service';
import { AuthService } from '../authentication/auth.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommunityService } from '../community/community.service';
import { NotificationService } from '../notification/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Disccussion {
  id: number;
  name: string;
  slug: string;
  answer_count: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  feeds: Array<any> = ['loading', 'loading', 'loading', 'loading', 'loading'];
  threadingDisscution: Array<any> = ['loading', 'loading', 'loading', 'loading', 'loading'];
  loading: Boolean = true;
  loadingThreadingDisscution: Boolean = true;
  loadingCommunites:  Boolean = true;
  meta:  any;
  loadingAnswer: Boolean = true;
  sharePost: Boolean = false;
  postUrL: String;
  componentName: String = 'home';
  currentUser: any;
  isCurrentUser: any;
  communites: Array<any> = ['loading', 'loading', 'loading', 'loading', 'loading'];

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
    public _postService: PostsService,
    public _uiUpdateService: UiUpdateService,
    public feedsService: FeedsService,
    public auth: AuthService,
    public _communityService: CommunityService,
    private snackBar: MatSnackBar,
    public router: Router,
    public _notification: NotificationService
  ) {
    this.postUrL = this.router.url;
    this.auth.isCurrentUser();
    this.currentUser =  this.auth.getCurrentUser();
  }


  ngOnInit() {
    this.auth.listenToCurrentUserChanges.subscribe(res => {
      this.isCurrentUser = res;
    });
    this.getFeeds();
    this.treadingDiscussion();
    this.getCommunites();
    if (this.isCurrentUser) {
      this.emmitNotificationCount();
    }
  }

  getFeeds() {
    this.feedsService.getFeeds().subscribe(res => {
      this.loading = false;
      this.loadingAnswer = false;
      this.meta = res.meta;
      this.feeds = res.questions;
      this.toggleShare();
      this.listenAndChooseVote();
    }, err => {
      throw err;
    });
  }

  emmitNotificationCount() {
    this._notification.notification_count().subscribe(res => {
      this._notification.emmitNotificationCount(res.notification_count);
    }, err => {
      throw err;
    });
  }

  treadingDiscussion() {
    this.feedsService.treadingDiscussion().subscribe(res => {
      this.loadingThreadingDisscution = false;
      this.threadingDisscution = res;
    });
  }

  gotToPost(slug) {
    this.router.navigate(['posts', slug], {fragment: 'post'});
  }

  getCommunites() {
    this._communityService.getTrendingCommunities().subscribe(resp => {
      this.loadingCommunites = false;
      this.communites = resp.categories;
    }, err => {
      throw err;
    });
  }

  goToCategories(community) {
   this.router.navigate(['communities', community.slug]);
  }

  unsubscribe(community) {
    community.subscribe = false;
    this._communityService.unsubscribe(community).subscribe(res => {
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
    this._communityService.subscribe(community).subscribe(res => {
      if (res.status === 200) {
        this.snackBar.open(res.message, null, { duration: 2000 });
      } else {
        this.snackBar.open(res.errors, null, { duration: 2000 });
      }
    }, err => {
      this.snackBar.open('server error', null, { duration: 2000 });
    });
  }

  onScroll(page) {
    if (page && this.meta.total_page !== page) {
      if (this.loadingAnswer) { return; }
      this.loadingAnswer = true;
      this.feedsService.getFeeds(page, 4).subscribe(res => {
        this.loadingAnswer = false;
        this.meta = res.meta;
        res.questions.map(item => {
          this.feeds.push(item);
        });
      }, err => {
        throw err;
      });
    }
  }

  toggleShare() {
    this._uiUpdateService.listenToToggleShared.subscribe(res => {
      if (res) {
        res.sharePost = !res.sharePost;
      }
    }, err => {
      throw err;
    });
  }


/**
 * The voting methods will be moved to a service in the future.
 */
  upvote(post) {
    if (post.vote.currentUserHasUpvote) {
      post.vote_count -= 1;
      post.vote.currentUserHasUpvote = false;
      post.vote.voteValue = -1;
    } else if (post.vote_count === -1) {
      post.vote_count += 2;
      post.vote.voteValue = +1;
      post.vote.currentUserHasUpvote = true;
      post.vote.currentUserHasDownVote = false;
    } else {
      post.vote_count += 1;
      post.vote.voteValue = +1;
      post.vote.currentUserHasUpvote = true;
      post.vote.currentUserHasDownVote = false;
    }

    this.vote({value: post.vote.voteValue, id: post.id  }, 'questions');
  }

  downvote(post) {
    if (post.vote.currentUserHasDownVote) {
      post.vote_count += 1;
      post.vote.voteValue = +1;
      post.vote.currentUserHasDownVote = false;
    } else if (post.vote_count === +1) {
      post.vote_count -= 2;
      post.vote.voteValue = -1;
      post.vote.currentUserHasDownVote = true;
      post.vote.currentUserHasUpvote = false;
    } else {
      post.vote_count -= 1;
      post.vote.voteValue = -1;
      post.vote.currentUserHasDownVote = true;
    }
    this.vote({value: post.vote.voteValue, id: post.id  }, 'questions');
  }

  listenAndChooseVote() {
    this._uiUpdateService.listenToVotes.subscribe(res => {
      if (res && res.postType === 'question') {
        if (res.direction === 'up') {
          this.upvote(res);
        } else {
          this.downvote(res);
        }
      }
    });
  }

  vote(params, type) {
    this._postService.vote(params, type).subscribe(res => {
      if (res.success) {
      }
    }, err => {
      console.log(err);
    });
  }

}
