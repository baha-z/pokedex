import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})

export class HomePage {

  searchQuery: string = '';
  pokemons: any = [];
  
  constructor(public navCtrl: NavController, public pokeprovider: PokeapiProvider, private storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  getPokemons(val){

    let searchval = val.toLowerCase();

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present(); 

    this.pokeprovider.getPokemon(searchval)
    .subscribe(
      (data) => { // Success       
        this.pokemons =  [data];
        this.storage.forEach((key)=>{
          if (key.name == searchval || key.id == searchval){
            this.checkFavorite();
          } 
        })
      },
      (error) =>{
        console.error(error);
        let alert = this.alertCtrl.create({
          title: 'Oh noes!',
          subTitle:  'Pokémon ' + '"'+val+'"' + ' ' + error.error.detail,
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }

  checkFavorite(){
    let heart = document.querySelector('.heart');
    let favText = document.getElementById('fav-text');

    if (heart.classList.contains('selected')){
      //if already haves clase selected and you click, removes class and deletes favorite from storage
      heart.classList.remove('selected')
      favText.textContent = "Add to Favorites";
      this.storage.remove(this.pokemons[0].id.toString());
 
    }
    else{
      heart.classList.add('selected');
      favText.textContent = "Remove from favorites";      
    }
  }

  randomPokemon(){
    let random = Math.floor((Math.random() * 150) + 1).toString();
    this.getPokemons(random);
  }

  addFavorite(pokemon){
    this.storage.set(pokemon.id.toString(), pokemon).then((successData)=>{
      this.checkFavorite();
    });
  }

  searchPokemon(ev: any){
      // set val to the value of the searchbar
      let val = ev.target.value;
      if (val != '' && typeof val != 'undefined'){
        this.getPokemons(val);
      }
  }


}
