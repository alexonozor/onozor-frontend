import { Component, OnInit, Input } from '@angular/core';
import { } from '../posts.service';
import { PostsService } from '../posts.service';
import { UiUpdateService } from '../ui-update.service';
import { AuthService } from '../../authentication/auth.service';


@Component({
  selector: '[app-post-action-bar]',
  templateUrl: './post-action.component.html',
  styles: []
})
export class PostActionComponent implements OnInit {
  @Input() post: any;
  @Input() postType: string;
  @Input() componentName: string;

  constructor(
    public _postService: PostsService,
    public auth: AuthService,
    public _uiService: UiUpdateService
  ) { }

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
      // navigate to edit post
    }
  }

  deletePost(post, componentType) {
    if (componentType === 'answer') {
      // push delete  event to the answer controller
    } else {
      // push delete  event to the question controller
    }
  }
}
