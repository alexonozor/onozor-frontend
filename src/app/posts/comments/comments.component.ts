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
  public comments: Array<any> = [];
  constructor(public _postService: PostsService) { }

  ngOnInit() {
    this.getComments(this.slug, this.commentableType);
  }

  getComments(slug, commentableType) {
    if (commentableType === 'question') {
      this._postService.getComment(slug).subscribe(res => {
        this.comments = res.comments;
      }, err => {

      });
    } else {
     this.comments =  this.slug;
     console.log(this.comments);
    }
  }


}
