import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { RouterResolver } from './router.resolver';


const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { crisis: RouterResolver } },
  {
    path: 'authenticate',
    loadChildren: './authentication/auth.module#AuthModule'
  },
  {
    path: 'posts',
    loadChildren: './posts/post.module#PostModule'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'communities',
    loadChildren: './community/community.module#CommunityModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    NgProgressModule.forRoot(),
    NgProgressRouterModule
  ],
  providers: [RouterResolver],
  exports: [RouterModule, NgProgressModule]
})
export class AppRoutingModule { }
