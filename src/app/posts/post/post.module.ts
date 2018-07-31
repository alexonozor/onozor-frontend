import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../posts.component';
import { AnswersComponent } from '../answers/answers.component';
import { AnswerFormComponent } from '../answer-form/answer-form.component';
import { CommentsComponent } from '../comments/comments.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { SharedModule } from '../../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SharedModule
  ],
  declarations: [
    PostsComponent,
    AnswersComponent,
    AnswerFormComponent,
    CommentsComponent,
    CommentFormComponent,
  ]
})
export class PostModule { }
