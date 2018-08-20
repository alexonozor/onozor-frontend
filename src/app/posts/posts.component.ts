import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './posts.service';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { AuthService } from '../authentication/auth.service';
import { UiUpdateService } from './ui-update.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit, OnDestroy {
  showComment: Boolean = false;
  sharePost: Boolean = false;
  private sub: any;
  slug: String;
  public post: any;
  public loading: Boolean = true;
  public newAnswerReciver: Object = {};
  isCurrentUser: Boolean = false;
  currentUser: any;
  public favourite: Boolean = true;
  postUrL: String;
  componentName: String = 'post';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public location: Location,
    private _postService: PostsService,
    public notification: NzNotificationService,
    public auth: AuthService,
    public _uiUpdateService: UiUpdateService
  ) {
    this.postUrL = this.router.url;
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.getPost(this.slug);
    });
    this.toggleComment();
    this.toggleShare();
    this.listenAndChooseVote();
  }

  getPost(slug) {
    this._postService.getPost(slug).subscribe(res => {
      this.loading = false;
      this.post = res;
      this.favourite = res.question.favourited;
    }, err => {
      this.location.back();
      this.notification.create('error', 'Error Feching Data',
        'We have detect some internal server error while try to render your requested data. This is embarassing and we are sorry.');
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
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


/**
 * The voting methods will be moved to a service in the furture.
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
