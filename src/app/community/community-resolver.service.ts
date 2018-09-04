import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CommunityService } from './community.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
 class CommunitiesResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _communityService: CommunityService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._communityService.getCommunities();
  }
}

@Injectable()
 class CommunityResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private _communityService: CommunityService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.params.slug;
    return this._communityService.getCommunity(slug);
  }
}


export  {
  CommunitiesResolver,
  CommunityResolver,
};
