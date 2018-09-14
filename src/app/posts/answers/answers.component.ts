import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../../authentication/auth.service';
import { UiUpdateService } from '../ui-update.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable ,  SubscriptionLike as ISubscription } from 'rxjs';



@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})

export class AnswersComponent implements OnInit, OnDestroy {
  @Input() slug: string;
  public loading: Boolean = true;
  public loadingAnswer: Boolean = true;
  public allanswers: Array<any> = [];
  private subscription: ISubscription;

  updateForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;
  pageMeta: any;
  currentUser: any;
  postUrL: String;
  componentName: String = 'answer';
  sub: Observable<any>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public _postService: PostsService,
    public notification: NzNotificationService,
    public modalService: NzModalService,
    public message: NzMessageService,
    public auth: AuthService,
    public _uiUpdateService: UiUpdateService
  ) {
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit() {
    this.getAnswers(this.slug);
    this.listenToNewAnswerChanges();
    this.listenToDeleteAnswerEvent();
    this.prepareForm();
    this.listenAndChooseVote();
    this.listenToEditAnswerEvent();
  }

  getAnswers(slug, page?) {
    this.loading = true;
    this._postService.getAnswers(slug, page).subscribe(res => {
      this.loading = false;
      this.pageMeta = res.meta;
      res.answers.map(item => {
        item['editing'] = false;
        this.allanswers.push(item);
      });
    }, err => {
    });
  }

  listenToNewAnswerChanges() {
    this._postService.currenetAddedAnswer.subscribe(answer => {
      if (answer) {
        this.allanswers.unshift(answer);
      }
    });
  }

  prepareForm() {
    this.updateForm = this.fb.group({
      body: ['', [Validators.required]],
      send_mail: [true]
    });
  }

  deleteAnswer(answer): void {
    const confirmDelete = confirm('Are you sure you want to this answer');
    if (confirmDelete) {
      const deletedElement = document.getElementById(`answer-${answer.id}`);
      deletedElement.style.display = 'none';
      this._postService.deleteAnswer(this.slug, answer.id).subscribe(res => { }, err => {
        this.message.error('Unable to delete this message, server or internet error', { nzDuration: 5000 });
      });
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  editAnswer(answer) {
    answer['editing'] = true;
  }

  cancleEditAnswer(answer) {
    answer['editing'] = false;
  }

  listenToEditAnswerEvent() {
    this._uiUpdateService.listenToEditPost.subscribe(data => {
      if (data && data.postType === this.componentName) {
        this.editAnswer(data);
      }
    }, err => {
      console.log(err);
    });
  }

  listenToDeleteAnswerEvent() {
    this._uiUpdateService.listenToDeletePost.subscribe(data => {
      if (data && data.postType === this.componentName) {
        this.deleteAnswer(data);
      }
    }, err => {
      console.log(err);
    });
  }



  submitForm(answer) {
    this.isSubmited = true;
    this._postService.updateAnswer(this.updateForm.value, answer.id).subscribe(res => {
      this.isSubmited = false;
      if (res.status === 500) {
        this.message.error('You can\'t submit empty answer', { nzDuration: 3000 });
      } else {
        this.editAnswer(answer);
        answer.body = this.updateForm.value.body;
      }
    }, error => {
      this.isSubmited = false;
      this.message.error('Network or server error', { nzDuration: 3000 });
    });
  }

  onScroll(page) {
    if (page && this.pageMeta.total_page !== page) {
      if (this.loading) { return; }
      this.loading = true;
      this.loadingAnswer = true;
      this._postService.getAnswers(this.slug, page).subscribe(res => {
        this.loading = false;
        this.loadingAnswer = false;
        this.pageMeta = res.meta;
        res.answers.map(item => {
          item['editing'] = false;
          this.allanswers.push(item);
        });
      }, err => {
      });
    }
  }

  upvote(answer) {
    if (answer.vote.currentUserHasUpvote) {
      answer.vote_count -= 1;
      answer.vote.currentUserHasUpvote = false;
      answer.vote.voteValue = -1;
    } else if (answer.vote_count === -1) {
      answer.vote_count += 2;
      answer.vote.voteValue = +1;
      answer.vote.currentUserHasUpvote = true;
      answer.vote.currentUserHasDownVote = false;
    } else {
      answer.vote_count += 1;
      answer.vote.voteValue = +1;
      answer.vote.currentUserHasUpvote = true;
      answer.vote.currentUserHasDownVote = false;
    }

    this.vote({ value: answer.vote.voteValue, id: answer.id }, 'answers');
    // console.log({value: this.post.question.vote_count, id: this.post.question.id  });
  }

  downvote(answer) {
    if (answer.vote.currentUserHasDownVote) {
      answer.vote_count += 1;
      answer.vote.voteValue = +1;
      // this.post.question.vote.currentUserHasUpvote = false;
      answer.vote.currentUserHasDownVote = false;
    } else if (answer.vote_count === +1) {
      answer.vote_count -= 2;
      answer.vote.voteValue = -1;
      answer.vote.currentUserHasDownVote = true;
      answer.vote.currentUserHasUpvote = false;
    } else {
      answer.vote_count -= 1;
      answer.vote.voteValue = -1;
      //  this.post.question.vote.currentUserHasUpvote = false;
      answer.vote.currentUserHasDownVote = true;
    }
    this.vote({ value: answer.vote.voteValue, id: answer.id }, 'answers');
  }

  listenAndChooseVote() {
    this._uiUpdateService.listenToVotes.subscribe(res => {
      if (res && res.postType === 'answer') {
        if (res.direction === 'up') {
          this.upvote(res);
        } else {
          this.downvote(res);
        }
      }
    });
  }

  vote(params, type) {
    this._postService.vote(params, type).subscribe(res => {
      if (res.success) { }
    }, err => {
      console.log(err);
    });
  }




}
