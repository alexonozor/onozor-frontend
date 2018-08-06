import { Component, OnInit, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { PostsService } from '../posts.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit {
  answerForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;
  loading: Boolean = true;

  @Input() questionId: string;


  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    public _postService: PostsService
  ) { }

  ngOnInit() {
    this.prepareForm();
  }

  prepareForm() {
    this.answerForm = this.fb.group({
      body: [null, [Validators.required]],
      user_id: ['', [Validators.required]],
      question_id: [this.questionId, [Validators.required]],
      send_mail: [true]
    });
  }

  submitForm() {
    this.isSubmited = true;
    this._postService.saveAnswer(this.answerForm.value, this.questionId).subscribe(res => {
      this.isSubmited = false;
      if (res.status === 500) {
        this.message.error('You can\'t submit empty answer', { nzDuration: 3000 });
      } else {
        this.answerForm.patchValue({body: ''});
        this._postService.updateRecentAnswer(res.answer);
      }
    }, error => {
      this.isSubmited = false;
      this.message.error('validation error', { nzDuration: 3000 });
    });
  }

}
