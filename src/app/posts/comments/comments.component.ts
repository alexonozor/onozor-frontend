import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';
import { NzMessageService, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  @Input() slug: any;
  @Input() commentableType: string;
  @Input() answerComments?: Array<any> = [];
  private comments: Array<any> = [];
  constructor(
    public _postService: PostsService,
    public notification: NzNotificationService,
    public modalService: NzModalService,
    public message: NzMessageService
  ) { }

  ngOnInit() {
    this.getComments(this.slug, this.commentableType);
    this.listenToCommentsChanges();
  }

  getComments(slug, commentableType) {
    if (commentableType === 'Question') {
      this._postService.getComment(slug).subscribe(res => {
        this.comments = res.comments;
      }, err => {
        this.notification.create('error', 'Error Feching Data',
          'We have detect some internal server error while try to render your requested data. This is embarassing and we are sorry.');
      });
    } else {
      this.comments = this.answerComments;
    }
  }

  listenToCommentsChanges() {
    this._postService.currenetAddedComment.subscribe(comment => {
      if (comment) {
        if (this.slug === comment.commentable_id) { // only listen if the comment belongs to the actual component.
          this.comments.push(comment);
        }
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
      nzOnOk:  function handelCancle() {
        const deletedElement = document.getElementById(`comment-${id}`);
        deletedElement.style.display = 'none';
        self._postService.deleteComment(self.slug, id).subscribe(res => {}, err => {
        self.message.error('Unable to delete this message, server or internet error', { nzDuration: 5000 });
      });
      }
    });
  }
}
