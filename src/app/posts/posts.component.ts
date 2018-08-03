import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './posts.service';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { Location } from '@angular/common';

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
    public router: Router,
    public location: Location,
    private _postService: PostsService,
    public notification: NzNotificationService
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
      this.location.back();
      this.notification.create('error', 'Error Feching Data',
      'We have detect some internal server error while try to render your requested data. This is embarassing and we are sorry.');
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
