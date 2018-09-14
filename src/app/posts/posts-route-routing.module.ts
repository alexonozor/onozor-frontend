import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from '../home/home.component';
import { RouterResolver } from '../router.resolver';
import { PostEditResolver, CommunitiesRouterResolver } from './posts-resolver';
import { PostGaurdGuard } from '../posts/post-gaurd.guard';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'create', component: CreatePostComponent, resolve: { categories: CommunitiesRouterResolver }, canActivate: [AuthGuard] },
  { path: 'edit/:slug', component: CreatePostComponent,
    resolve: { post: PostEditResolver, categories: CommunitiesRouterResolver }
    // canActivate: [PostGaurdGuard]
  },
  { path: ':slug', component: PostsComponent, resolve: { post: PostEditResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRouteRoutingModule { }
