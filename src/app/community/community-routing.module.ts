import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunitiesComponent } from './communities/communities.component';
import { CommunityComponent } from './community/community.component';
import { CommunitiesResolver, CommunityResolver } from './community-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: CommunitiesComponent, resolve: { communities: CommunitiesResolver  }  },
  { path: ':slug', component: CommunityComponent, resolve: { community: CommunityResolver  }  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityRoutingModule { }
