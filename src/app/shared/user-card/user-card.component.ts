import { Component, OnInit, Input } from '@angular/core';
import { FeedsService } from '../../feeds/feeds.service';
import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';
// import { UiUpdateService } from '../posts/ui-update.service';
// import { PostsService } from '../posts/posts.service';
import { AuthService } from '../../authentication/auth.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})

export class UserCardComponent implements OnInit {
  @Input() user: any;
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
    public auth: AuthService,
    public router: Router) {
      this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit() {}
}
