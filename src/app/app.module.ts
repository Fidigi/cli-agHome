import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
// Fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// Form
import { ReactiveFormsModule } from '@angular/forms';
// Service
import { AppConfigService } from './service/app-config.service';
import { ApolloService } from './service/apollo.service';
import { AuthentService } from './service/auth/authent.service';
// Apollo
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule } from 'apollo-angular-link-http';
// Routing
import { AppRoutingModule } from './app-routing.module';
import { ErrorModule } from './module/error/error.module';
import { AdminModule } from './module/admin/admin.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/common/login/login.component';
import { MenuComponent } from './component/common/menu/menu.component';
import { HomeComponent } from './component/home/home.component';
import { ModalComponent } from './component/modal/modal.component';

export function initializeService(appService: any) {
  return () => appService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
    ErrorModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER,
      useFactory: initializeService,
      deps: [AppConfigService], multi: true },
    ApolloService,
    AuthentService,
    { provide: APP_INITIALIZER,
      useFactory: initializeService,
      deps: [AuthentService], multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(fas, far, fab);
  }
}
