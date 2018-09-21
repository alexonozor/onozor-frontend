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
export class NotificationService {
  private host = environment.baseUrl;


  constructor(
    public http: HttpClient
  ) { }


  getNotifications(): Observable<any> {
    return this.http.get(`${this.host}/notifications`)
      .pipe(map((res: Response) => res)
    );
  }
}
