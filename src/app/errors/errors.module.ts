import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


// import { ErrorsHandler } from './errors-handler/errors-handler';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { TokenInterceptor } from './auth.interceptor';
import { ErrorRoutingModule } from './errors-routing.module';
import { ErrorsComponent, Errors404Component, ErrorsInternetConnectionComponent } from './errors.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorRoutingModule,
  ],
  declarations: [
    ErrorsComponent,
    Errors404Component,
    ErrorsInternetConnectionComponent
  ],
  providers: [
    GlobalErrorHandlerService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ]
})
export class ErrorsModule { }
