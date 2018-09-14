
import {of as observableOf,  Observable, timer } from 'rxjs';

import {catchError,  map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';



@Injectable()
 class UserProfileRouterResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.params['slug'];
    return this._userService.getUser(slug).pipe(catchError(() => {
      return observableOf('data not available at this time');
    }));
  }
}

@Injectable()
 class UserProfileQuestionsRouterResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.parent.params.slug;
    return this._userService.getUserQuestions(slug);
  }
}

@Injectable()
 class UserProfileAnswersRouterResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.parent.params.slug;
    return this._userService.getUserAnswers(slug);
  }
}

@Injectable()
 class UserProfileFavouriteRouterResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.parent.params.slug;
    return this._userService.getUserFavourites(slug);
  }
}

@Injectable()
 class UserProfileFollowersRouterResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.parent.params.slug;
    return this._userService.getUserFollowers(slug);
  }
}

@Injectable()
 class UserProfileFollowingRouterResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.parent.params.slug;
    return this._userService.getUserFollowing(slug);
  }
}

@Injectable()
 class UsersRouterResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._userService.getUsers();
  }
}

export  {
  UsersRouterResolver,
  UserProfileRouterResolver,
  UserProfileQuestionsRouterResolver,
  UserProfileAnswersRouterResolver,
  UserProfileFollowersRouterResolver,
  UserProfileFollowingRouterResolver,
  UserProfileFavouriteRouterResolver
};
