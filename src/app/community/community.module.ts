import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunitiesResolver, CommunityResolver } from './community-resolver.service';
import { CommunityService } from './community.service';
import { MyOwnCustomMaterialModule } from '../material';
import { CommunitiesComponent } from './communities/communities.component';
import { CommunityComponent } from './community/community.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from './../shared/shared.module';
import { ContentLoaderModule } from '@netbasal/content-loader';


@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule,
    MyOwnCustomMaterialModule,
    InfiniteScrollModule,
    SharedModule,
    ContentLoaderModule
  ],
  declarations: [
    CommunitiesComponent,
    CommunityComponent
  ],
  providers: [
    CommunitiesResolver,
    CommunityResolver
  ],
})
export class CommunityModule { }
