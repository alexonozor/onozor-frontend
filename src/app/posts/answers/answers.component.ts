import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';
import { NzMessageService, NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  @Input() slug: string;
  public loading: Boolean = true;
  public answers: Array<any> = ['loading', 'loading', 'loading'];

  constructor(
    public _postService: PostsService,
    public notification: NzNotificationService,
    public modalService: NzModalService,
    public message: NzMessageService
  ) { }

  ngOnInit() {
    this.getAnswers(this.slug);
    this.listenToNewAnswerChanges();
  }

  getAnswers(slug) {
    this._postService.getAnswers(slug).subscribe(res => {
      this.loading = false;
      this.answers = res.answers;
    }, err => {

    });
  }

  listenToNewAnswerChanges() {
    this._postService.currenetAddedAnswer.subscribe(answer => {
      this.answers.unshift(answer);
    });
  }

  deleteAnswer(id): void {
    const self = this;
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete this question?',
      nzOkText: 'Yes',
      nzCancelText: 'Cancel',
      nzOnOk:  function handelCancle() {
        const deletedElement = document.getElementById(`answer-${id}`);
        deletedElement.style.display = 'none';
        self._postService.deleteAnswer(self.slug, id).subscribe(res => {}, err => {
        self.message.error('Unable to delete this message, server or internet error', { nzDuration: 5000 });
      });
      }
    });
  }

}
