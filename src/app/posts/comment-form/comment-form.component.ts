import { Component, OnInit, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { PostsService } from '../posts.service';
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
  @Input() commentableType: string;
  @Input() questionId: string;
  currentUser: Number = 1;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    public _postService: PostsService
  ) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      body: [null, [Validators.required]],
      user_id: [this.currentUser, [Validators.required]],
      commentable_type: [this.commentableType, [Validators.required]],
      commentable_id: [this.questionId, [Validators.required]],
    });
  }

  submitForm() {
    this.isSubmited = true;
    this._postService.saveComment(this.commentForm.value, this.questionId).subscribe(res => {
      this.isSubmited = false;
      if (res.status === 500) {
        this.message.error('You can\'t submit an empty comment', { nzDuration: 3000 });
      } else {
        this.commentForm.patchValue({body: ''});
        this._postService.updateRecentComments(res.data);
      }
    }, error => {
      this.isSubmited = false;
      this.message.error('validation error', { nzDuration: 3000 });
    });
  }

}
