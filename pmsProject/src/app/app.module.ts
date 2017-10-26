import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AllmissingdatesPage } from '../pages/allmissingdates/allmissingdates';
import { FillformPage } from '../pages/fillform/fillform';
import { UpdatePage } from '../pages/update/update';

import { StatusBar } from '@ionic-native/status-bar';

import { SplashScreen } from '@ionic-native/splash-screen';
import { RestfullProvider } from '../providers/restfull/restfull';
import { HttpModule } from '@angular/http';
import { DataExchange } from '../providers/dataexchange/dataexchange';
import { Config } from '../providers/config/config';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { LogoutPage } from '../pages/logout/logout';
import { TabsPage } from '../pages/tabs/tabs';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AllmissingdatesPage,
    FillformPage,
    UpdatePage,
    LogoutPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AllmissingdatesPage,
    FillformPage,
    UpdatePage,
    LogoutPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestfullProvider,
    DataExchange,
    Config,
    FillformPage,
    ListPage,
    UpdatePage,
    AllmissingdatesPage,
    LogoutPage,
    TabsPage
  ]
})
export class AppModule { }
