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
  private deleteSource = new BehaviorSubject<any>(null);
  private editSource = new BehaviorSubject<any>(null);

  listenToToggleComment = this.toggleCommentSource.asObservable();
  listenToToggleShared = this.toggleSharedSource.asObservable();
  listenToVotes = this.voteSource.asObservable();
  listenToEditPost = this.editSource.asObservable();
  listenToDeletePost = this.deleteSource.asObservable();

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

  editPost(post, type) {
    post['postType'] = type;
    this.editSource.next(post);
  }

  deletePost(post, type) {
    post['postType'] = type;
    this.deleteSource.next(post);
  }
}
