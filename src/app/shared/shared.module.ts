import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharePostComponent } from './share-post/share-post.component';
import { MyOwnCustomMaterialModule } from '../material';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgZorroAntdModule,
    MyOwnCustomMaterialModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SharePostComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SharePostComponent
  ]
})
export class SharedModule { }
