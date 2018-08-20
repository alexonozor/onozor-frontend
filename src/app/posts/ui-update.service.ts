import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiUpdateService {
  private toggleCommentSource = new BehaviorSubject<any>(null);
  private toggleSharedSource = new BehaviorSubject<any>(null);
  private voteSource = new BehaviorSubject<any>(null);
  listenToToggleComment = this.toggleCommentSource.asObservable();
  listenToToggleShared = this.toggleSharedSource.asObservable();
  listenToVotes = this.voteSource.asObservable();

  constructor() { }

  toggleComment(post) {
    this.toggleCommentSource.next(post);
  }

  toggleShare(post) {
    this.toggleSharedSource.next(post);
  }

  chooseVote(post, direction, postType) {
     post['direction'] = direction;
     post['postType'] = postType;
    this.voteSource.next(post);
  }
}
