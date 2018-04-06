import { Component, ViewChild } from '@angular/core'
import { Nav, Platform,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FavoritesPage } from '../pages/favorites/favorites';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;

  pages: Array<{title: string, component: any,icon:string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage, icon:'md-home'},
      { title: 'Favorites', component: FavoritesPage, icon:'md-heart'},
    ];

  }

  openPage(page) {
    this.nav.setRoot(page.component);

  }
}


