import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  showComment: Boolean = false;
  private sub: any;
  slug: String;
  public post: Object = {};
  public loading: Boolean = true;
  public newAnswerReciver: Object = {};
  constructor(
    private route: ActivatedRoute,
    private _postService: PostsService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.getPost(this.slug);
    });
  }

  getPost(slug) {
    this._postService.getPost(slug).subscribe(res => {
      this.loading = false;
      this.post = res;
    }, err => {

    });
  }

  toggleComment() {
    this.showComment = !this.showComment;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateAnswers(event) {
    this.newAnswerReciver = event;
  }

}
