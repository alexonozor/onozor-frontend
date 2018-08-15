import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../feeds/feeds.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feeds: Array<any> = ['loading', 'loading', 'loading', 'loading', 'loading'];
  loading: Boolean = true;
  meta:  any;
  loadingAnswer: Boolean = true;
  sharePost: Boolean = false;
  postUrL: String;

  constructor(public feedsService: FeedsService,  public router: Router) {
    this.postUrL = this.router.url;
  }

  ngOnInit() {
    this.feedsService.getFeeds().subscribe(res => {
      this.loading = false;
      this.loadingAnswer = false;
      this.meta = res.meta;
      this.feeds = res.questions;
    }, err => {
      console.log(err);
    });
  }

  onScroll(page) {
    if (page && this.meta.total_page !== page) {
      if (this.loadingAnswer) { return; }
      this.loadingAnswer = true;
      this.feedsService.getFeeds(page, 4).subscribe(res => {
        this.loadingAnswer = false;
        this.meta = res.meta;
        res.questions.map(item => {
          this.feeds.push(item);
        });
      }, err => {
      });
    }
  }

  toggleShare() {
   this.sharePost = !this.sharePost;
  }

}
