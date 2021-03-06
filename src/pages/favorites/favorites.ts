import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favorites: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.forEach((key)=>{
      this.favorites.push(key);
    })
  }

  removeFavorite(pokemon){
    this.storage.remove(pokemon.id.toString());

    let index = this.favorites.findIndex((favs)=>{
      return favs.id == pokemon.id;
    })

    this.favorites.splice(index,1);
  }

}
