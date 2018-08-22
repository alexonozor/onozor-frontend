import { Component, OnInit, Input } from '@angular/core';
import { } from '../posts.service';
import { PostsService } from '../posts.service';
import { UiUpdateService } from '../ui-update.service';
import { AuthService } from '../../authentication/auth.service';


@Component({
  selector: '[app-post-action-bar]',
  template: `

    <div fxFlex="50" fxLayout="row" fxFlexAlign="start">
      <button mat-icon-button  [ngClass]="post?.vote?.currentUserHasUpvote? 'mat-primary' : 'mat-icon-default' " 
      (click)="vote(post, 'up')" matTooltip="Up vote">
        <mat-icon aria-label="Example icon-button with a heart icon">thumb_up_alt</mat-icon>
      </button>
      <button mat-icon-button disabled>{{post.vote_count}}</button>
      <button mat-icon-button [ngClass]="post?.vote?.currentUserHasDownVote? 'mat-warn' : 'mat-icon-default'" 
      (click)="vote(post, 'down')" matTooltip="Down vote">
        <mat-icon aria-label="Example icon-button with a heart icon">thumb_down_alt</mat-icon>
      </button>

      <button mat-button *ngIf="componentName==='post'" (click)="toggleComment()"
      class="mat-icon-default">Ask details ({{post.comments_count}})</button>
      <button mat-button *ngIf="componentName==='home'" (click)="toggleComment()"
      class="mat-icon-default"> Answers ({{post.answers_count}})</button>
      <button mat-button *ngIf="componentName==='answer'" (click)="toggleComment()"
      class="mat-icon-default"> Comments ({{post.comments_count}})</button>
    </div>
    <div fxFlex="50" fxLayout="row" fxLayoutGap="20px" fxLayoutAlign="end center" *ngIf="postType === 'question'">
      <button mat-icon-button [ngClass]="post?.favourited? 'mat-warn' : 'mat-icon-default' " 
      (click)="favouritePost(post)" matTooltip="Mark as favourite">
        <mat-icon aria-label="Example icon-button with a heart icon">favorite</mat-icon>
      </button>
      <button mat-icon-button class="mat-icon-default" (click)="toggleShare(post)" matTooltip="Share post">
        <mat-icon aria-label="Example icon-button with a heart icon">share</mat-icon>
      </button>
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
}
