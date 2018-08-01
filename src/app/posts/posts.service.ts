import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private host = environment.baseUrl;
  private version = environment.version1;
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

}
