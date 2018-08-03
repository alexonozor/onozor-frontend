import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
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
export class PostsService {
  private host = environment.baseUrl;
  private version = environment.version1;

  private dataSource = new BehaviorSubject<Answer>(null);
  private commentSource = new BehaviorSubject<Comment>(null);
  currenetAddedAnswer = this.dataSource.asObservable();
  currenetAddedComment = this.commentSource.asObservable();


  constructor(
    public http: Http
  ) { }


  getPost(slug: String): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/questions/${slug}`)
      .pipe(map((res: Response) => res.json())
    );
  }

  getComment(slug: string): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/questions/${slug}/comments`)
      .pipe(map((res: Response) => res.json())
    );
  }

  getAnswers(slug: string): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/questions/${slug}/answers`)
      .pipe(map((res: Response) => res.json())
    );
  }

  saveAnswer(formParams: Object, id: string): Observable<any> {
    return this.http.post(`${this.host}/${this.version}/questions/${id}/answers`, formParams)
      .pipe(map((res: Response) => res.json())
    );
  }

  saveComment(formParams: Object, id: String): Observable<any> {
    return this.http.post(`${this.host}/${this.version}/questions/${id}/comments`, formParams)
      .pipe(map((res: Response) => res.json())
    );
  }

  updateRecentAnswer(answer: Answer) {
    this.dataSource.next(answer);
  }

  updateRecentComments(comments: Comment) {
    this.commentSource.next(comments);
  }

  deleteComment(questiond_id: string, id: string) {
    return this.http.delete(`${this.host}/${this.version}/questions/${questiond_id}/comments/${id}`)
      .pipe(map((res: Response) => res.json())
    );
  }

  deleteAnswer(questiond_id: string, id: string) {
    return this.http.delete(`${this.host}/${this.version}/questions/${questiond_id}/answers/${id}`)
      .pipe(map((res: Response) => res.json())
    );
  }

}
