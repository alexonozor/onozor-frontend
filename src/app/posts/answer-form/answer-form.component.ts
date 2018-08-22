import { Component, OnInit, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { PostsService } from '../posts.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from '../../authentication/auth.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  currentUser: any;

  @Input() questionId: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );


  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript',
    'superscript', '|', 'quote', 'insertLink', 'insertImage', '|', 'html']
};


  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private fb: FormBuilder,
    private message: NzMessageService,
    public _postService: PostsService
  ) { }

  ngOnInit() {
    this.prepareForm();
    this.currentUser = this.auth.getCurrentUser();
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
