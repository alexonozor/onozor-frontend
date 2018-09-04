import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from '../home/home.component';
import { RouterResolver } from '../router.resolver';
import { PostEditResolver, CommunitiesRouterResolver } from './posts-resolver';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: ':slug', component: PostsComponent, resolve: { post: PostEditResolver } },
  { path: 'post/create', component: CreatePostComponent, resolve: { categories: CommunitiesRouterResolver } },
  { path: 'post/edit/:slug', component: CreatePostComponent, resolve: { post: PostEditResolver, categories: CommunitiesRouterResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRouteRoutingModule { }
