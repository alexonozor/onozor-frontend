import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../posts/posts.service';
import { UiUpdateService } from '../../posts/ui-update.service';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgProgress } from '@ngx-progressbar/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-post-action-bar',
  templateUrl: './post-action.component.html',
  styleUrls: ['./post-action.component.scss']
})
export class PostActionComponent implements OnInit {
  @Input() post: any;
  @Input() postType: string;
  @Input() componentName: string;
  rootUrl: string = environment.rootUrl;
  currentUser: any;


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
    public auth: AuthService,
    public _uiService: UiUpdateService,
    public router: Router,
    public progress: NgProgress,
    public snackBar: MatSnackBar
  ) {
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit() { }

  toggleComment() {
    this._uiService.toggleComment(this.post);
  }

  toggleShare(post) {
    post.sharePost = !post.sharePost;
  }


  /**
 * The voting methods will be moved to a service in the furture.
 */
  vote(post) {
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
    this.updateVote({ value: post.vote.voteValue, id: post.id }, post.types);
  }

  updateVote(params, type) {
    this._postService.vote(params, type).subscribe(res => {
      if (res.success) {
        this.snackBar.open('Thanks for voting', 'close', {
          duration: 2000
        });
      }
    }, err => {
      throw err;
    });
  }

  /**
 * Save/favorite a post requires the post id only available for authenticated user.
 * @param post: Object
 */
  favouritePost(post) {
    this.post.favourited = !post.favourited;
    this._postService.savePost(post.id).subscribe(res => {
    }, err => {
      throw err;
    });
  }

  editPost(post, componentType) {
    if (componentType === 'answer') {
      this._uiService.editPost(post, componentType);
    } else {
      this.router.navigate(['posts/edit', post.slug]);
    }
  }

  deletePost(post, componentType) {
    if (componentType === 'answer') {
      this.deleteAnswer(post);
    } else {
      this.deletePosts(post);
    }
  }


  deleteAnswer(answer): void {
    const confirmDelete = confirm('Are you sure you want to this answer');
    if (confirmDelete) {
      const deletedElement = document.getElementById(`answer-${answer.id}`);
      deletedElement.style.display = 'none';
      this._postService.deleteAnswer(answer.question_id, answer.id).subscribe(res => {
        this.snackBar.open('Your answer has been deleted.', 'close', {
          duration: 2000
        });
      }, err => {
        throw err;
      });
    }
  }

  deletePosts(post) {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      this.progress.start();
      this._postService.deleteQuestion(post.id).subscribe(res => {
        this.progress.complete();
        if (res.status === 200) {
          window.location.href = '/';
        }
      }, err => {
        throw err;
      });
    }
  }

  goToAnswers(post) {
    this.router.navigate(['posts', post.slug], { fragment: 'answers' });
  }
}

