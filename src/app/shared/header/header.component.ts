import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../authentication/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreatePostComponent } from '../../posts/create-post/create-post.component';
import { NotificationService } from '../../notification/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { PostsService } from '../../posts/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() drawer: any;
  currentUser: any;
  isLoging: any;
  notification_counter: number;

  filteredUsers: any[] = [];
  usersForm: FormGroup;
  isLoading = false;
  showSearch: false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isDesktop$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    public dialog: MatDialog,
    public _notification: NotificationService,
    private fb: FormBuilder,
    public _postService: PostsService,
    public router: Router
  ) {
    this.auth.isCurrentUser();
    this.usersForm = this.fb.group({
      userInput: null
    });
  }

  logout() {
    this.isLoging = false;
    this.auth.logout();
  }

  ngOnInit() {
    this.listenToCurrentUser();

    this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this._postService.search({ name: value }, 1)
          .pipe(
            finalize(() => this.isLoading = false),
        )
        )
      )
      .subscribe(users => {
        this.filteredUsers = users.questions;
      });
  }

  listenToNotificationUpdate() {
    this._notification.listiningToUpdateCount.subscribe(res => {
      this.notification_counter = res;
    }, err => {
      throw err;
    });
  }

  listenToCurrentUser() {
    this.auth.listenToCurrentUserChanges.subscribe(res => {
      this.isLoging = res;
      if (this.isLoging) {
        this.listenToNotificationUpdate();
      }
    });
    this.currentUser = this.auth.getCurrentUser();
  }

  goToPost(post) {
    this.router.navigate(['posts', post.slug]);
  }


  showSearchForm(showSearch) {
     this.showSearch = showSearch;
     setTimeout(() => {
      document.getElementById('searchForm').focus();
     }, 100);
  }


  hideSearchForm(showSearch) {
    this.showSearch = showSearch;
    this.usersForm.reset();
  }


}
