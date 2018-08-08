import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, catchError } from 'rxjs/operators';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host = environment.baseUrl;
  private version = environment.version1;

  constructor(
    public http: HttpClient
  ) { }


  getUser(loginToken: String): Observable<any> {
    return this.http.get(`${this.host}/${this.version}/user/login-token/${loginToken}`)
      .pipe(map((res: Response) => res)
    );
  }

  login(formParams: String): Observable<any> {
    return this.http.post(`${this.host}/${this.version}/sessions/create`, formParams)
      .pipe(map((res: Response) => res)
    );
  }

  public getToken(): string {
    return localStorage.getItem('accessToken');
  }


}
