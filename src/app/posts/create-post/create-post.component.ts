
import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { PostsService } from '../posts.service';
import { AuthService } from '../../authentication/auth.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  updateForm: FormGroup;
  isSubmited: Boolean = false;
  formErrors: Array<any>;
  isThereError: Boolean = false;
  loading: Boolean = true;
  currentUser: any;
  post: any;
  @Input() answer: any;
  isUpdateForm: Boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );


  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private fb: FormBuilder,
    public _postService: PostsService,
    public activatedRoute: ActivatedRoute,
    public location: Location
  ) {
    this.subscribeForQuestion();
   }

   subscribeForQuestion() {
    this.activatedRoute.data.pipe(map(data => data)).subscribe(resp => {
      this.post = resp.post.question;
    }, err => {
      console.log(err);
    });
   }

  ngOnInit() {
    this.prepareForm();
    this.currentUser = this.auth.getCurrentUser();
  }

  prepareForm() {
    if (this.post) { // build form for update
      this.isUpdateForm = true;
      this.updateForm = this.fb.group({
        body: [this.post.body],
        name: [this.post.name, [Validators.required]],
        is_anonymous: [this.post.is_anonymous],
        send_mail: [true]
      });
    } else {
      this.updateForm = this.fb.group({
        body: [''],
        name: ['', [Validators.required]],
        is_anonymous: ['', [Validators.required]],
        send_mail: [true]
      });
    }
  }

  exitQuestionForm() {
   this.location.back();
  }

  submitForm(answer) {
    this.isSubmited = true;
    this._postService.updateAnswer(this.updateForm.value, answer.id).subscribe(res => {
      this.isSubmited = false;
      if (res.status === 500) {
      } else {
        answer.editing = !answer.editing;
        this.answer.body = this.updateForm.value.body;
      }
    }, error => {
      this.isSubmited = false;
    });
  }

}
