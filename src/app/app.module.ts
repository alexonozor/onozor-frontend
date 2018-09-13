import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ElementRef, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PostModule } from './posts/post.module';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MyOwnCustomMaterialModule } from './material';
import { BREAKPOINTS} from '@angular/flex-layout';
import { MomentModule } from 'ngx-moment';
import { NgProgressModule } from '@ngx-progressbar/core';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { AuthModule } from './authentication/auth.module';
import { ErrorsModule } from './errors/errors.module';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    NgZorroAntdModule,
    MyOwnCustomMaterialModule,
    AppRoutingModule,
    ErrorsModule,
    PostModule,
    SharedModule,
    NgProgressModule,
    InfiniteScrollModule,
    ContentLoaderModule,
    AuthModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          smartypants: true,
        },
      },
    }),
  ],
  exports: [
    InfiniteScrollModule,
    ContentLoaderModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
