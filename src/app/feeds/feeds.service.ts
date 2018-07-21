import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  private host = environment.baseUrl;
  private version = environment.version1;
  constructor(
    public http: Http
  ) { }

  getFeeds(): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/questions`)
      .pipe(map((res: Response) => res.json())
    );
  }

  userCategories(userId): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/users/2/user_categories`)
      .pipe(map((res: Response) => res.json())
    );
  }
}
