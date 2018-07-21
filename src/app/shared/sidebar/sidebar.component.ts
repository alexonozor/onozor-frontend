import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../../feeds/feeds.service';

@Component({
  selector: '[appSidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: Array<any> = ['loading', 'loading', 'loading', 'loading', 'loading'];
  loading: Boolean = true;
  meta: Object =  {};
  constructor(public feedsService: FeedsService) { }

  ngOnInit() {
    this.feedsService.userCategories(2).subscribe(res => {
      this.loading = false;
      this.meta = res.meta;
      this.categories = res.categories;
    }, err => {
      console.log(err);
    });
  }

}
