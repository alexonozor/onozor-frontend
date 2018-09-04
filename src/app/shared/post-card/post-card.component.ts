import { Component, OnInit, Input } from '@angular/core';
import { FeedsService } from '../../feeds/feeds.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})

export class PostCardComponent implements OnInit {
  @Input() feed: any;
  @Input() loading: Boolean;
  @Input() meta: any;

  loadingAnswer: Boolean = true;
  sharePost: Boolean = false;
  postUrL: String;
  componentName: String = 'home';
  currentUser: any;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  constructor(
    private breakpointObserver: BreakpointObserver,
    public feedsService: FeedsService,
    public router: Router) {
    this.postUrL = this.router.url;
  }

  ngOnInit() {}
}
