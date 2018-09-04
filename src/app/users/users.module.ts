import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
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

import { MomentModule } from 'ngx-moment';
import { QuestionsComponent } from './profile/questions/questions.component';
import { AnswersComponent } from './profile/answers/answers.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { FollowersComponent } from './profile/followers/followers.component';
import { FollowingComponent } from './profile/following/following.component';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MyOwnCustomMaterialModule,
    MomentModule,
    ContentLoaderModule,
    InfiniteScrollModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent,
    UsersComponent,
    QuestionsComponent,
    AnswersComponent,
    FavoritesComponent,
    FollowersComponent,
    FollowingComponent,
    SettingsComponent,
  ],
  providers: [
    UsersRouterResolver,
    UserProfileRouterResolver,
    UserProfileQuestionsRouterResolver,
    UserProfileAnswersRouterResolver,
    UserProfileFollowersRouterResolver,
    UserProfileFollowingRouterResolver,
    UserProfileFavouriteRouterResolver
  ],
  exports: []
})
export class UsersModule { }
