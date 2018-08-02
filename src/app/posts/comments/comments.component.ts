import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';

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
  constructor(public _postService: PostsService) { }

  ngOnInit() {
    this.getComments(this.slug, this.commentableType);
    this.listenToCommentsChanges();
  }

  getComments(slug, commentableType) {
    if (commentableType === 'Question') {
      this._postService.getComment(slug).subscribe(res => {
        this.comments = res.comments;
      }, err => {

      });
    } else {
      this.comments = this.answerComments;
    }
  }

  listenToCommentsChanges() {
    this._postService.currenetAddedComment.subscribe(comment => {
      if (comment) {
        console.log(this.slug, comment.commentable_id);
        if (this.slug === comment.commentable_id) { // only listen if the comment belongs to the actual component.
          this.comments.push(comment);
        }
     }
    });
  }


}
