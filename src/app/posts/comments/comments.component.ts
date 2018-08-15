import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';
import { NzMessageService, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  commentUpdateForm: FormGroup;
  @Input() slug: any;
  @Input() commentableType: string;

  currentUser: Number = 1;
  comments: Array<any> = [];
  private editing: Boolean = false;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;
  loading: Boolean = true;
  commentId: string;
  pageMeta: Object = {};
  loadingComments: Boolean = false;

  constructor(
    private fb: FormBuilder,
    public _postService: PostsService,
    public notification: NzNotificationService,
    public modalService: NzModalService,
    public message: NzMessageService
  ) { }

  ngOnInit() {
    this.getComments(this.slug, this.commentableType);
    this.prepareCommentForm();
    this.listenToCommentsChanges();
  }

  prepareCommentForm() {
    this.commentUpdateForm = this.fb.group({
      body:             [null, [Validators.required]],
      user_id:          [this.currentUser, [Validators.required]],
      commentable_type: [this.commentableType, [Validators.required]],
      commentable_id:   [this.slug, [Validators.required]],
    });
  }

    /**
   * bind comment content and update it.
   * @param commentId is required to update the specific comment
   * @param formvalue is required new updated form.
   */
  updateCommentForm(params) {
    this.isSubmited = true;
    this._postService.updateComment(this.commentUpdateForm.value, params.id).subscribe(res => {
      this.isSubmited = false;
      if (res.status === 500) {
        this.message.error('You can\'t submit an empty comment', { nzDuration: 3000 });
      } else {
        document.getElementById(`comment-body-${params.id}`).style.display = 'block';
        document.getElementById(`comment-form-${params.id}`).style.display = 'none';
        params.body = this.commentUpdateForm.value.body;
      }
    }, error => {
      this.isSubmited = false;
      this.message.error('validation error', { nzDuration: 3000 });
    });
  }

  getComments(slug, commentableType, page?) {
    this.loadingComments = true;
    if (commentableType === 'Question') {
      this._postService.getQuestionComments(slug, page).subscribe(res => {
        this.pageMeta = res.meta;
        this.loadingComments = false;
        res.comments.map(item => {
         this.comments.push(item);
        });
      }, err => {
        this.notification.create('error', 'Error Feching Data',
          'We have detect some internal server error while try to render your requested data. This is embarassing and we are sorry.');
      });
    } else {
      this._postService.getAnswerComments(slug, page).subscribe(res => {
        this.pageMeta = res.meta;
        this.loadingComments = false;
        res.comments.map(item => {
         this.comments.push(item);
        });
      }, err => {
        this.loadingComments = false;
        this.notification.create('error', 'Error Feching Data',
          'We have detect some internal server error while try to render your requested data. This is embarassing and we are sorry.');
      });
    }
  }

  loadMoreComments(page) {
    this.getComments(this.slug, this.commentableType, page);
  }

  listenToCommentsChanges() {
    this._postService.currenetAddedComment.subscribe(comment => {
        if (comment && this.slug === comment.commentable_id) { // only listen if the comment belongs to the actual component.
          this.comments.push(comment);
        }
    });
  }

  deleteComment(id): void {
    const self = this;
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete this reply?',
      nzOkText: 'Yes',
      nzCancelText: 'Cancel',
      nzOnOk: function handelCancle() {
        const deletedElement = document.getElementById(`comment-${id}`);
        deletedElement.style.display = 'none';
        self._postService.deleteComment(self.slug, id).subscribe(res => { }, err => {
          self.message.error('Unable to delete this message, server or internet error', { nzDuration: 5000 });
        });
      }
    });
  }




  editComment(editing, commentId) {
    document.getElementById(`comment-body-${commentId}`).style.display = 'none';
    document.getElementById(`comment-form-${commentId}`).style.display = 'block';
  }
}
