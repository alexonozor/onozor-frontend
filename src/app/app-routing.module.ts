import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { RouterResolver } from './router.resolver';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent, resolve: { crisis: RouterResolver } },
  {
    path: 'authenticate',
    loadChildren: './authentication/auth.module#AuthModule'
  },
  { path: 'posts/:slug', component: PostsComponent, resolve: { crisis: RouterResolver } }
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
