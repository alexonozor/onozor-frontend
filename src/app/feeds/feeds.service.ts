import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response } from '@angular/http';

interface Disccussion {
  id: number;
  name: string;
  slug: string;
  answer_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  private host = environment.baseUrl;
  constructor(
    public http: HttpClient
  ) { }

  getFeeds(pageNumber = 1, perPage = 5): Observable<any> {
    return this.http.get(`${this.host}/questions?page=${pageNumber}&per_page=${perPage}`)
      .pipe(map((res: Response) => res)
    );
  }

  treadingDiscussion(): Observable<any> {
    return this.http.get(`${this.host}/questions/hots_questions`)
      .pipe(map((res: Response) => res)
    );
  }

  userCategories(userId): Observable<any> {
    return this.http.get(`${this.host}/users/2/user_categories`)
      .pipe(map((res: Response) => res)
    );
  }
}
