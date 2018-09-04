import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { AnswersComponent } from './answers/answers.component';
import { AnswerFormComponent } from './answer-form/answer-form.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { EditAnswerFormComponent } from './edit-answer-form/edit-answer-form.component';
import { SharedModule } from './../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MomentModule } from 'ngx-moment';
import { MarkdownModule } from 'ngx-markdown';
import { MyOwnCustomMaterialModule } from './../material';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsRouteRoutingModule } from './posts-route-routing.module';
import { PostEditResolver, CommunitiesRouterResolver } from './posts-resolver';
import { ContentLoaderModule } from '@netbasal/content-loader';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SharedModule,
    MomentModule,
    MyOwnCustomMaterialModule,
    InfiniteScrollModule,
    MarkdownModule.forChild(),
    PostsRouteRoutingModule,
    ContentLoaderModule
  ],
  declarations: [
    PostsComponent,
    AnswersComponent,
    AnswerFormComponent,
    CommentsComponent,
    CommentFormComponent,
    EditAnswerFormComponent,
    CreatePostComponent
  ],
  exports: [EditAnswerFormComponent],
  providers: [PostEditResolver, CommunitiesRouterResolver]
})
export class PostModule { }
