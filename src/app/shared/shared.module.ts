import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharePostComponent } from './share-post/share-post.component';
import { PostCardComponent } from './post-card/post-card.component';
import { MyOwnCustomMaterialModule } from '../material';
import { TruncatePipe } from '../truncate.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostActionComponent } from './post-action/post-action.component';
import { MomentModule } from 'ngx-moment';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { UserCardComponent } from './user-card/user-card.component';
import { RelationishipButtonComponent } from './relationiship-button/relationiship-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgZorroAntdModule,
    MyOwnCustomMaterialModule,
    InfiniteScrollModule,
    MomentModule,
    ContentLoaderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SharePostComponent,
    PostCardComponent,
    TruncatePipe,
    PostActionComponent,
    UserCardComponent,
    RelationishipButtonComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SharePostComponent,
    PostCardComponent,
    TruncatePipe,
    PostActionComponent,
    UserCardComponent,
    RelationishipButtonComponent
  ]
})
export class SharedModule { }
