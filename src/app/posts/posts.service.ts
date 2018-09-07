import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private dataSource = new BehaviorSubject<Answer>(null);
  private commentSource = new BehaviorSubject<Comment>(null);
  currenetAddedAnswer = this.dataSource.asObservable();
  currenetAddedComment = this.commentSource.asObservable();


  constructor(
    public http: HttpClient
  ) { }


  getPost(slug: String): Observable<any> {
    return this.http.get(`${this.host}/questions/${slug}`)
      .pipe(map((res: Response) => res)
    );
  }

  getQuestionComments(slug: string, page = 1): Observable<any> {
    return this.http.get(`${this.host}/question/${slug}/comments?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getAnswerComments(slug: string, page = 1): Observable<any> {
    return this.http.get(`${this.host}/answer/${slug}/comments?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getAnswers(slug: string, page = 1): Observable<any> {
    return this.http.get(`${this.host}/question/${slug}/answers?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  saveAnswer(formParams: Object, id: string): Observable<any> {
    return this.http.post(`${this.host}/questions/${id}/answers`, formParams)
      .pipe(map((res: Response) => res)
    );
  }

  saveComment(formParams: Object, id: String): Observable<any> {
    return this.http.post(`${this.host}/questions/${id}/comments`, formParams)
      .pipe(map((res: Response) => res)
    );
  }

  updateComment(formParams: Object,  id: String): Observable<any> {
    return this.http.put(`${this.host}/comment/${id}`, formParams)
      .pipe(map((res: Response) => res)
    );
  }

  updateAnswer(formParams: Object,  id: String): Observable<any> {
    return this.http.put(`${this.host}/answer/${id}`, formParams)
      .pipe(map((res: Response) => res)
    );
  }

  savePost(postId: string): Observable<any> {
    return this.http.get(`${this.host}/favourites/${postId}/toggle`)
      .pipe(map((res: Response) => res)
    );
  }

  updateRecentAnswer(answer: Answer) {
    this.dataSource.next(answer);
  }

  updateRecentComments(comments: Comment) {
    this.commentSource.next(comments);
  }

  deleteComment(questiond_id: string, id: string): Observable<any> {
    return this.http.delete(`${this.host}/questions/${questiond_id}/comments/${id}`)
      .pipe(map((res: Response) => res)
    );
  }

  deleteAnswer(questiond_id: string, id: string): Observable<any> {
    return this.http.delete(`${this.host}/questions/${questiond_id}/answers/${id}`)
      .pipe(map((res: Response) => res)
    );
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${this.host}/questions/${id}`)
      .pipe(map((res: Response) => res)
    );
  }

  createQuestion(formParams: object): Observable<any> {
    return this.http.post(`${this.host}/questions`, formParams)
      .pipe(map((res: Response) => res)
    );
  }


  updateQuestion(formParams: object, id: string): Observable<any> {
    return this.http.put(`${this.host}/questions/${id}`, formParams)
      .pipe(map((res: Response) => res)
    );
  }


  vote(voteParams: any, type: string): Observable<any> {
    return this.http.post(`${this.host}/${type}/${voteParams.id}/vote`, voteParams)
      .pipe(map((res: Response) => res)
    );
  }

  categories(value= ''): Observable<any> {
    const params = new HttpParams().set('term', value);
    return this.http.get(`${this.host}/categories`, { params: params })
      .pipe(map((res: Response) => res)
    );
  }

}
