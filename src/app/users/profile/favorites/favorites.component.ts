import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../authentication/auth.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  currentUser: any;
  questions: Array<any>;
  meta: any;
  componentName: String = 'post';
  loading = false;
  slug: any;
  loadingAnswer: Boolean = true;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public location: Location,
    public auth: AuthService,
    public _userService: UserService
  ) {
    activatedRoute.parent.params.subscribe(params => {
      this.slug = params.slug;
    });
    this.currentUser = this.auth.getCurrentUser();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );



  ngOnInit() {
    this.getUserQuestions();
  }

  getUserQuestions() {
    this.activatedRoute.data.pipe(map(data => data.questions)).subscribe(resp => {
      this.loading = false;
      this.loadingAnswer = false;
      this.meta = resp.meta;
      this.questions = resp.questions;
    }, err => {
      console.log(err);
    });
  }


  onScroll(page) {
    if (page && this.meta.total_page !== page) {
      if (this.loadingAnswer) { return; }
      this.loadingAnswer = true;
      this._userService.getUserFavourites(this.slug, page).subscribe(res => {
        this.loadingAnswer = false;
        this.meta = res.meta;
        res.questions.map(item => {
          this.questions.push(item);
        });
      }, err => {
      });
    }
  }

}
