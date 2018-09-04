import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-edit-answer-form',
  templateUrl: './edit-answer-form.component.html',
  styleUrls: ['./edit-answer-form.component.scss']
})
export class EditAnswerFormComponent implements OnInit {
  updateForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;
  loading: Boolean = true;
  currentUser: any;

  @Input() answer: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );


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
    this.updateForm = this.fb.group({
      body: [this.answer.body, [Validators.required]],
      send_mail: [true]
    });
  }

  submitForm(answer) {
    this.isSubmited = true;
    this._postService.updateAnswer(this.updateForm.value, answer.id).subscribe(res => {
      this.isSubmited = false;
      if (res.status === 500) {
        this.message.error('You can\'t submit empty answer', { nzDuration: 3000 });
      } else {
        answer.editing = !answer.editing;
        this.answer.body = this.updateForm.value.body;
      }
    }, error => {
      this.isSubmited = false;
      this.message.error('Network or server error', { nzDuration: 3000 });
    });
  }

}
