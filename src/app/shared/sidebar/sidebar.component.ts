import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../../feeds/feeds.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: Array<any> = ['loading', 'loading', 'loading', 'loading', 'loading'];
  loading: Boolean = true;
  meta: Object =  {};

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public feedsService: FeedsService
  ) { }


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
