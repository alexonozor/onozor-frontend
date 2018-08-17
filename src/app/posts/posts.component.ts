import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './posts.service';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { AuthService } from '../authentication/auth.service';


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
  public post:  any;
  public loading: Boolean = true;
  public newAnswerReciver: Object = {};
  isCurrentUser: Boolean = false;
  currentUser: any;
  public favourite: Boolean = true;
  postUrL: String;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public location: Location,
    private _postService: PostsService,
    public notification: NzNotificationService,
    public auth: AuthService
  ) {
    this.postUrL = this.router.url;
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.getPost(this.slug);
    });
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

  /**
   * Save/favorite a post requires the post id only available for authenticated user.
   * @param post: Object
   */
  favouritePost(post) {
    this.favourite = !this.favourite;
    this._postService.savePost(post.question.id).subscribe(res => {
    }, err => {
      this.location.back();
      this.notification.create('error', 'Error Feching Data',
      'We have detect some internal server error while try to render your requested data. This is embarassing and we are sorry.');
    });
  }

  toggleComment() {
    if (this.sharePost) {
      this.sharePost = !this.sharePost;
   }
   this.showComment = !this.showComment;
  }

  toggleShare() {
    if (this.showComment) {
      this.showComment = !this.showComment;
   }
   this.sharePost = !this.sharePost;
  }

  upvote() {
    if (this.post.question.vote.currentUserHasUpvote) {
      this.post.question.vote_count -= 1;
      this.post.question.vote.currentUserHasUpvote = false;
    } else if (this.post.question.vote_count === -1) {
      this.post.question.vote_count += 2;
      this.post.question.vote.currentUserHasUpvote = true;
      this.post.question.vote.currentUserHasDownVote = false;
    } else {
      this.post.question.vote_count += 1;
      this.post.question.vote.currentUserHasUpvote = true;
      this.post.question.vote.currentUserHasDownVote = false;
    }

    this.vote({value: this.post.question.vote_count, id: this.post.question.id  }, this.post.question.id, 'questions');
    console.log({value: this.post.question.vote_count, id: this.post.question.id  });
  }

  downvote() {
    if (this.post.question.vote.currentUserHasDownVote) {
      this.post.question.vote_count += 1;
      // this.post.question.vote.currentUserHasUpvote = false;
      this.post.question.vote.currentUserHasDownVote = false;
    } else if (this.post.question.vote_count === +1) {
      this.post.question.vote_count -= 2;
      this.post.question.vote.currentUserHasDownVote = true;
      this.post.question.vote.currentUserHasUpvote = false;
    } else {
      this.post.question.vote_count -= 1;
      //  this.post.question.vote.currentUserHasUpvote = false;
      this.post.question.vote.currentUserHasDownVote = true;
    }
    this.vote({value: this.post.question.vote_count, id: this.post.question.id  }, this.post.question.id, 'questions');
    console.log({value: this.post.question.vote_count, id: this.post.question.id  });
  }


  vote(params, id, type) {
    this._postService.vote(params, id, type).subscribe(res => {
      if (res.success) {
        console.log('upvoted');
      }
    }, err => {
      console.log(err);
    });
  }





  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateAnswers(event) {
    this.newAnswerReciver = event;
  }
}
