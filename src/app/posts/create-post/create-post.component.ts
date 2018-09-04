
import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { PostsService } from '../posts.service';
import { AuthService } from '../../authentication/auth.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

export interface Category {
  id: number;
  name: string;
  description: string;
  permalink: string;
  slug: string;
  image: string;
  links: {questions: string };
}

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
  categories: Array<any> = [];
  @Input() answer: any;
  isUpdateForm: Boolean = false;
  filteredCategories: Observable<Category[]>;
  categoriesCtrl = new FormControl();

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
    public location: Location,
    public router: Router
  ) {
    this.subscribeForQuestion();
    this.subscribeForCategories();
    this.prepareForm();
   }


   subscribeForQuestion() {
    this.activatedRoute.data.pipe(map(data => data)).subscribe(resp => {
      this.post = resp.post.question;
    }, err => {
      console.log(err);
    });
   }


  public displayFn = (key) => {
    const selection = this.categories.find(e => e.name === name);
    if (selection) {
      return selection.id;
    }
  }

   subscribeForCategories() {
    this.activatedRoute.data.pipe(map(data => data.categories)).subscribe(resp => {
      this.categories = resp.categories;
    }, err => {
      console.log(err);
    });
   }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
  }

  prepareForm() {
    if (this.post) { // build form for update
      const categoryId = this.post.category ? this.post.category.id : null;
      this.isUpdateForm = true;
      this.updateForm = this.fb.group({
        category_id: [categoryId, [Validators.required]],
        body: [this.post.body],
        name: [this.post.name, [Validators.required]],
        is_anonymous: [this.post.is_anonymous],
        send_mail: [true]
      });
    } else {
      this.updateForm = this.fb.group({
        category_id: ['', [Validators.required]],
        body: [''],
        name: ['', [Validators.required]],
        is_anonymous: [''],
        send_mail: [true]
      });
    }
  }

  exitQuestionForm() {
   this.location.back();
  }

  submitForm() {
    this.isSubmited = true;
    if (this.isUpdateForm) {
      this.updateQuestion(this.post.id);
    } else {
      this.createQuestion();
    }
  }

  updateQuestion(id) {
    this._postService.updateQuestion(this.updateForm.value, id).subscribe(res => {
      this.isSubmited = false;
      this.router.navigate(['posts', res.data.slug]);
    }, error => {
      this.isSubmited = false;
    });
  }

  createQuestion() {
    this._postService.createQuestion(this.updateForm.value).subscribe(resp => {
      this.isSubmited = false;
      this.router.navigate(['posts', resp.question.slug]);
    }, err => {
      this.isSubmited = false;
    });
  }
}
