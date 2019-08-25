import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NotificationModule } from '@shared/notification/notification.module';

import { AppComponent } from './app.component';

import { DefaultComponent } from './layout/default/default.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TopNavigationComponent } from './layout/top-navigation/top-navigation.component';

@NgModule({
  declarations: [
	AppComponent,
	DefaultComponent,
	FooterComponent,
	TopNavigationComponent,
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,

	NotificationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
