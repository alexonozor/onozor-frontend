import { Component, OnInit, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { PostsService } from '../posts.service';
import { AuthService } from '../../authentication/auth.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})

export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;
  loading: Boolean = true;
  currentUser: any;
  isCurrentUser: Boolean;

  @Input() commentableType: string;
  @Input() slug: string;
  @Input() commentId: string;
  @Input() editing: Boolean;
  @Input() commentBody: string;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    public  _postService: PostsService,
    public _authService: AuthService
  ) {
    this.currentUser = this._authService.getCurrentUser();
    this._authService.isCurrentUser();
  }

  ngOnInit() {
    this._authService.listenToCurrentUserChanges.subscribe(res => this.isCurrentUser = res);
    this.prepareCommentForm();
  }

  /**
   * Prepare Comment form
   */
  prepareCommentForm() {
    this.commentForm = this.fb.group({
      body:             [null, [Validators.required]],
      user_id:          [this.currentUser.id],
      commentable_type: [this.commentableType, [Validators.required]],
      commentable_id:   [this.slug, [Validators.required]],
    });
  }

  /**
   * check if it's a new comment or it's updating/editing before submitting.
  */
  submitForm() {
    this.saveComment();
  }


  /**
   * save comment with comment value;
   */
  saveComment() {
    this.isSubmited = true;
    this._postService.saveComment(this.commentForm.value, this.slug).subscribe(res => {
      this.isSubmited = false;
      if (res.status === 500) {
        this.message.error('You can\'t submit an empty comment', { nzDuration: 3000 });
      } else {
        this.commentForm.patchValue({ body: '' });
        this._postService.updateRecentComments(res.data);
      }
    }, error => {
      this.isSubmited = false;
      this.message.error('validation error', { nzDuration: 3000 });
    });
  }

}
