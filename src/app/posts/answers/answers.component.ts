import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  @Input() slug: string;
  public loading: Boolean = true;
  public loadingAnswer: Boolean = true;
  public allanswers: Array<any> = [];

  updateForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;
  pageMeta: any;

  constructor(
    private fb: FormBuilder,
    public _postService: PostsService,
    public notification: NzNotificationService,
    public modalService: NzModalService,
    public message: NzMessageService
  ) { }

  ngOnInit() {
    this.getAnswers(this.slug);
    this.listenToNewAnswerChanges();
    this.prepareForm();
  }

  getAnswers(slug, page?) {
    this.loading = true;
    this._postService.getAnswers(slug, page).subscribe(res => {
      this.loading = false;
      this.pageMeta = res.meta;
      res.answers.map(item => {
        this.allanswers.push(item);
      });
    }, err => {
    });
  }

  listenToNewAnswerChanges() {
    this._postService.currenetAddedAnswer.subscribe(answer => {
      if (this.allanswers.length > 0) {
        this.allanswers.unshift(answer);
      }
    });
  }

  prepareForm() {
    this.updateForm = this.fb.group({
      body: ['', [Validators.required]],
      send_mail: [true]
    });
  }

  deleteAnswer(id): void {
    const self = this;
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete this question?',
      nzOkText: 'Yes',
      nzCancelText: 'Cancel',
      nzOnOk: function handelCancle() {
        const deletedElement = document.getElementById(`answer-${id}`);
        deletedElement.style.display = 'none';
        self._postService.deleteAnswer(self.slug, id).subscribe(res => { }, err => {
          self.message.error('Unable to delete this message, server or internet error', { nzDuration: 5000 });
        });
      }
    });
  }

  editAnswer(answer) {
    document.getElementById(`answer-${answer.id}`).style.display = 'none';
    document.getElementById(`answer-update-form-${answer.id}`).style.display = 'block';
  }

  submitForm(answer) {
    this.isSubmited = true;
    this._postService.updateAnswer(this.updateForm.value, answer.id).subscribe(res => {
      this.isSubmited = false;
      if (res.status === 500) {
        this.message.error('You can\'t submit empty answer', { nzDuration: 3000 });
      } else {
        document.getElementById(`answer-${answer.id}`).style.display = 'block';
        document.getElementById(`answer-update-form-${answer.id}`).style.display = 'none';
        answer.body = this.updateForm.value.body;
      }
    }, error => {
      this.isSubmited = false;
      this.message.error('Network or server error', { nzDuration: 3000 });
    });
  }

  onScroll(page) {
    if (page && this.pageMeta.total_page !== page) {
      if (this.loading) { return; }
      this.loading = true;
      this.loadingAnswer = true;
      this._postService.getAnswers(this.slug, page).subscribe(res => {
        this.loading = false;
        this.loadingAnswer = false;
        this.pageMeta = res.meta;
        res.answers.map(item => {
          this.allanswers.push(item);
        });
      }, err => {
      });
    }
  }


}
