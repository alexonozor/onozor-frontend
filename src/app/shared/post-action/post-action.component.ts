import { Component, OnInit, Input } from '@angular/core';
import { } from '../posts.service';
import { PostsService } from '../../posts/posts.service';
import { UiUpdateService } from '../../posts/ui-update.service';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgProgress } from '@ngx-progressbar/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-action-bar',
  templateUrl: './post-action.component.html',
  styles: []
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
    public progress: NgProgress
  ) {
    this.currentUser =  this.auth.getCurrentUser();
  }

  ngOnInit() { }

  toggleComment() {
    this._uiService.toggleComment(this.post);
  }

  toggleShare(post) {
    this._uiService.toggleShare(post);
  }

  vote(post, direction) {
    this._uiService.chooseVote(this.post, direction, this.postType);
  }

  /**
 * Save/favorite a post requires the post id only available for authenticated user.
 * @param post: Object
 */
  favouritePost(post) {
    this.post.favourited = !post.favourited;
    this._postService.savePost(post.id).subscribe(res => {
    }, err => {
    });
  }

  editPost(post, componentType) {
    if (componentType === 'answer') {
      this._uiService.editPost(post, componentType);
    } else {
      this.router.navigate(['post/edit', post.slug]);
    }
  }

  deletePost(post, componentType) {
    if (componentType === 'answer') {
      this._uiService.deletePost(post, componentType);
    } else {
      const confirmDelete = confirm('Are you sure you want to delete this post?');
      if (confirmDelete) {
        this.progress.start();
        this._postService.deleteQuestion(post.id).subscribe(res => {
          this.progress.complete();
          if (res.status === 200) {
            window.location.href = '/';
          }
        }, err => {
          console.log('err');
        });
      }
    }
  }
}

