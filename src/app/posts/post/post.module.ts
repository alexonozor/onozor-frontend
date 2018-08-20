import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../posts.component';
import { AnswersComponent } from '../answers/answers.component';
import { AnswerFormComponent } from '../answer-form/answer-form.component';
import { CommentsComponent } from '../comments/comments.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MomentModule } from 'ngx-moment';
import { MarkdownModule } from 'ngx-markdown';
import { PostActionComponent } from '../post-action/post-action.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SharedModule,
    MomentModule,
    InfiniteScrollModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    PostsComponent,
    AnswersComponent,
    AnswerFormComponent,
    CommentsComponent,
    CommentFormComponent,
    PostActionComponent
  ],
  exports: [PostActionComponent]
})
export class PostModule { }
