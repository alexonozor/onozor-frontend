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
export class PostsService {
  private host = environment.baseUrl;
  private version = environment.version1;

  private dataSource = new BehaviorSubject<Answer>(null);
  private commentSource = new BehaviorSubject<Comment>(null);
  currenetAddedAnswer = this.dataSource.asObservable();
  currenetAddedComment = this.commentSource.asObservable();


  constructor(
    public http: HttpClient
  ) { }


  getPost(slug: String): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/questions/${slug}`)
      .pipe(map((res: Response) => res)
    );
  }

  getQuestionComments(slug: string, page = 1): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/question/${slug}/comments?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getAnswerComments(slug: string, page = 1): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/answer/${slug}/comments?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  getAnswers(slug: string, page = 1): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/question/${slug}/answers?page=${page}`)
      .pipe(map((res: Response) => res)
    );
  }

  saveAnswer(formParams: Object, id: string): Observable<any> {
    return this.http.post(`${this.host}/${this.version}/questions/${id}/answers`, formParams)
      .pipe(map((res: Response) => res)
    );
  }

  saveComment(formParams: Object, id: String): Observable<any> {
    return this.http.post(`${this.host}/${this.version}/questions/${id}/comments`, formParams)
      .pipe(map((res: Response) => res)
    );
  }

  updateComment(formParams: Object,  id: String): Observable<any> {
    return this.http.put(`${this.host}/${this.version}/comment/${id}`, formParams)
      .pipe(map((res: Response) => res)
    );
  }

  updateAnswer(formParams: Object,  id: String): Observable<any> {
    return this.http.put(`${this.host}/${this.version}/answer/${id}`, formParams)
      .pipe(map((res: Response) => res)
    );
  }

  savePost(postId: string): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/favourites/${postId}/toggle`)
      .pipe(map((res: Response) => res)
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
      .pipe(map((res: Response) => res)
    );
  }

  deleteQuestion(id: string) {
    return this.http.delete(`${this.host}/${this.version}/questions/${id}`)
      .pipe(map((res: Response) => res)
    );
  }

  createQuestion(formParams: object) {
    return this.http.post(`${this.host}/${this.version}/questions`, formParams)
      .pipe(map((res: Response) => res)
    );
  }


  updateQuestion(formParams: object, id: string) {
    return this.http.put(`${this.host}/${this.version}/questions/${id}`, formParams)
      .pipe(map((res: Response) => res)
    );
  }


  vote(voteParams: any, type: string): Observable<any> {
    return this.http.post(`${this.host}/${this.version}/${type}/${voteParams.id}/vote`, voteParams)
      .pipe(map((res: Response) => res)
    );
  }

}
