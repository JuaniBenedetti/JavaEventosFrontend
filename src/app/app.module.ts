import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomComponentsModule } from './shared/modules/custom-components.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './security/interceptors/auth/auth.interceptor';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SalonState } from './model/state/salonState';
import { ProgressBarState } from './model/state/progressBarState';
import { PendingRequestInterceptor } from './security/interceptors/pending-request/pending-request.interceptor';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    AppRoutingModule, 
    HttpClientModule, 
    MatSidenavModule, 
    CustomComponentsModule,
    IonicModule.forRoot(), 
    NgxsModule.forRoot([SalonState, ProgressBarState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token')
      }
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: PendingRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
