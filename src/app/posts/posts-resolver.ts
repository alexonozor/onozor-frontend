import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, timer } from 'rxjs';
// import {  HttpClient } from '@angular/common/http'; //already injected service
import { map, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PostsService } from './posts.service';


const host = environment.baseUrl;
 const version = environment.version1;

@Injectable()
export class PostEditResolver implements Resolve<any> {

  constructor(
    //   public http: HttpClient,
      private router: Router,
      private _postService: PostsService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
     const slug = route.params['slug'];
     if (slug) {
        return this._postService.getPost(slug);
     }
  }
}

@Injectable()
export class CommunitiesRouterResolver implements Resolve<any> {

  constructor(
    //   public http: HttpClient,
      private router: Router,
      private _postService: PostsService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._postService.categories();
  }
}
