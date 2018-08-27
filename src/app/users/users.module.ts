import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './user/users.component';
import { MyOwnCustomMaterialModule } from '../material';
import {
  UsersRouterResolver,
  UserProfileRouterResolver,
  UserProfileQuestionsRouterResolver,
  UserProfileAnswersRouterResolver,
  UserProfileFollowersRouterResolver,
  UserProfileFollowingRouterResolver,
  UserProfileFavouriteRouterResolver
 } from './user-resolver.service';
import { AllUsersComponent } from './all-users/all-users.component';
import { MomentModule } from 'ngx-moment';
import { QuestionsComponent } from './profile/questions/questions.component';
import { AnswersComponent } from './profile/answers/answers.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { FollowersComponent } from './profile/followers/followers.component';
import { FollowingComponent } from './profile/following/following.component';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MyOwnCustomMaterialModule,
    MomentModule,
    ContentLoaderModule,
    InfiniteScrollModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    UsersComponent,
    AllUsersComponent,
    QuestionsComponent,
    AnswersComponent,
    FavoritesComponent,
    FollowersComponent,
    FollowingComponent
  ],
  providers: [
    UsersRouterResolver,
    UserProfileRouterResolver,
    UserProfileQuestionsRouterResolver,
    UserProfileAnswersRouterResolver,
    UserProfileFollowersRouterResolver,
    UserProfileFollowingRouterResolver,
    UserProfileFavouriteRouterResolver
  ]
})
export class UsersModule { }
