import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import {
  UsersRouterResolver,
  UserProfileRouterResolver,
  UserProfileQuestionsRouterResolver,
  UserProfileAnswersRouterResolver,
  UserProfileFollowersRouterResolver,
  UserProfileFollowingRouterResolver,
  UserProfileFavouriteRouterResolver
} from './user-resolver.service';
import { UsersComponent } from './user/users.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { QuestionsComponent } from './profile/questions/questions.component';
import { AnswersComponent } from './profile/answers/answers.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { FollowersComponent } from './profile/followers/followers.component';
import { FollowingComponent } from './profile/following/following.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: UsersComponent, resolve: { users: UsersRouterResolver  }  },
  { path: ':slug', component: ProfileComponent,
  children: [
    {path: '', redirectTo: 'questions', pathMatch: 'full' },
    { path: 'questions', component: QuestionsComponent, resolve: { questions: UserProfileQuestionsRouterResolver} },
    { path: 'answers', component: AnswersComponent, resolve: { questions: UserProfileAnswersRouterResolver} },
    { path: 'favourites', component: FavoritesComponent, resolve: { questions: UserProfileFavouriteRouterResolver } },
    { path: 'followers', component: FollowersComponent, resolve: { users: UserProfileFollowersRouterResolver } },
    { path: 'following', component: FollowingComponent, resolve: { users: UserProfileFollowingRouterResolver } },
  ],
   resolve: { user: UserProfileRouterResolver  }  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
