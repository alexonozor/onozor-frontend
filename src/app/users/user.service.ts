import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, catchError } from 'rxjs/operators';

interface Comment {
  commentable_id: number;
  commentable_type: string;
  body: string;
  user_id: string;
}

interface Answer {
  question_id: number;
  commentable_type: string;
  body: string;
  user_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.baseUrl;
  private version = environment.version1;


  constructor(
    public http: HttpClient
  ) { }


  getUser(slug: String): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/users/${slug}`)
      .pipe(map((res: Response) => res)
    );
  }

  getUserQuestions(slug: String, page = 1 ): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/users/${slug}/questions?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getUserAnswers(slug: String, page = 1): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/users/${slug}/answers?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getUserFavourites(slug: String, page = 1): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/users/${slug}/favorites?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getUserFollowers(slug: String, page = 1): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/users/${slug}/followers?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getUserFollowing(slug: String, page = 1): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/users/${slug}/following?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/users`)
      .pipe(map((res: Response) => res)
    );
  }
}
