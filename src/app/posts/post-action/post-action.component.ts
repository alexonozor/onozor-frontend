import { Component, OnInit, Input } from '@angular/core';
import {  } from '../posts.service';
import { PostsService } from '../posts.service';
import { UiUpdateService } from '../ui-update.service';
import { AuthService } from '../../authentication/auth.service';


@Component({
  selector: 'app-post-action-bar',
  template: `
    <div nz-row nzGutter="48" class="post-action-bar">
    <div nz-col nzSpan="15">

      <button nz-button class="remove-border" [ngClass]="{active: post?.vote?.currentUserHasUpvote}"
      nzType="default" [nzSize]="large" (click)="vote(post, 'up')">
        <i class="fa fa-arrow-up"></i> Upvote {{post.vote_count}}</button>

        <button nz-button class="remove-border" [ngClass]="{active: post?.vote?.currentUserHasDownVote}"
        nzType="default" [nzSize]="large" (click)="vote(post, 'down')">
          <i class="fa fa-arrow-down"></i> Downvote</button>

      <button *ngIf="componentName==='post'" nz-button class="remove-border" nzType="default" [nzSize]="large" (click)="toggleComment()"
      nz-tooltip nzTitle="Unable to understand the question? ask for more info.">
        <i class="fa fa-reply"></i> Ask details ({{post.comments_count}})</button>

      <button *ngIf="componentName==='home'" nz-button class="remove-border" nzType="default" [nzSize]="large" (click)="toggleComment()"
      nz-tooltip>
        <i class="fa fa-reply"></i> Answers ({{post.answers_count}})</button>

      <button *ngIf="componentName==='answer'" nz-button class="remove-border" nzType="default" [nzSize]="large" (click)="toggleComment()">
          <i class="fa fa-reply"></i> Comments ({{post.comments_count}})</button>

    </div>

    <div nz-col nzSpan="9" style="text-align: right;">
      <nz-dropdown *ngIf="currentUser && currentUser.id == post?.author?.id">
        <button class="remove-border" nzSize="large" nz-button nz-dropdown nz-tooltip nzTitle="More">
          <i class="fas fa-ellipsis-h"></i>
        </button>
        <ul nz-menu>
            <li nz-menu-item>
              <a><i class="fa fa-edit"></i> Edit </a>
            </li>
            <li nz-menu-item>
              <a>
                <i class="fa fa-trash-alt"></i> Delete Post </a>
            </li>
        </ul>
      </nz-dropdown>
    <div *ngIf="postType === 'question'">
      <button class="remove-border" nzSize="large" nz-button (click)="favouritePost(post)" nz-tooltip nzTitle="Favorite">
        <i [ngClass]="post?.favourited? 'anticon anticon-heart red' : 'anticon anticon-heart-o'"></i>
      </button>
      <button (click)="toggleShare(post)" nzSize="large" class="remove-border" nz-button nz-tooltip nzTitle="Share">
        <i class="anticon anticon-share-alt"></i>
      </button>
    </div>
  </div>
  `,
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
  ) {}

  ngOnInit() {}

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
}
