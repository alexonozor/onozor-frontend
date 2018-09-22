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
  private dataSource = new BehaviorSubject<any>(null);
  listiningToUpdateCount = this.dataSource.asObservable();



  constructor(
    public http: HttpClient
  ) { }


  getNotifications(): Observable<any> {
    return this.http.get(`${this.host}/notifications`)
      .pipe(map((res: Response) => res)
    );
  }

  markAsSeen(id): Observable<any> {
    return this.http.put(`${this.host}/notifications/${id}`, { seen: true, read: true, read_at: Date.now()})
      .pipe(map((res: Response) => res)
    );
  }

  markAllAsRead(params): Observable<any> {
    return this.http.put(`${this.host}/notifications/mark_all`, params)
      .pipe(map((res: Response) => res)
    );
  }

  notification_count(): Observable<any> {
    return this.http.get(`${this.host}/notifications/notification_count`)
      .pipe(map((res: Response) => res)
    );
  }

  emmitNotificationCount(count) {
    this.dataSource.next(count);
  }
}
