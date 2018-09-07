import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class CommunityService {
  private host = environment.baseUrl;


  constructor(
    public http: HttpClient
  ) { }



  getCommunities(page = 1): Observable<any> {
    return this.http.get(`${this.host}/categories?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getCommunity(slug): Observable<any> {
    return this.http.get(`${this.host}/categories/${slug}`)
      .pipe(map((res: Response) => res)
    );
  }

  getCommunityQuestions(slug, page = 1): Observable<any> {
    return this.http.get(`${this.host}/categories/${slug}/get_questions?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  subscribe(community): Observable<any> {
    return this.http.post(`${this.host}/subscribe/communities`, {category_id: community.id})
      .pipe(map((res: Response) => res)
    );
  }

  unsubscribe(community): Observable<any> {
    return this.http.delete(`${this.host}/unsubscribe/communities/${community.id}`)
      .pipe(map((res: Response) => res)
    );
  }

}


