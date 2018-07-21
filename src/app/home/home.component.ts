import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../feeds/feeds.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feeds: Array<any> = ['loading', 'loading', 'loading', 'loading', 'loading'];
  loading: Boolean = true;
  meta: Object =  {};
  constructor(public feedsService: FeedsService) { }

  ngOnInit() {
    this.feedsService.getFeeds().subscribe(res => {
      this.loading = false;
      this.meta = res.meta;
      this.feeds = res.questions;
    }, err => {
      console.log(err);
    });
  }

}
