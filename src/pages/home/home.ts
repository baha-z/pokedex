import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})

export class HomePage {

  searchQuery: string = '';
  pokemons: any = [];
  
  constructor(public navCtrl: NavController, public pokeprovider: PokeapiProvider, private storage: Storage) {
  }

  getPokemons(val){
    this.pokeprovider.getPokemon(val)
    .subscribe(
      (data) => { // Success
        this.pokemons =  [data];
        this.storage.forEach((key)=>{
          if (key.name == val || key.id == val){
            this.checkFavorite();
          } 
        })
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  checkFavorite(){
    let heart = document.querySelector('.heart');

    if (heart.classList.contains('selected')){
      //if already haves clase selected and you click, removes class and deletes favorite from storage
      heart.classList.remove('selected')
      this.storage.remove(this.pokemons[0].id);
      console.log(this.pokemons[0].id);
    }
    else{
      heart.classList.add('selected');
    }
  }

  randomPokemon(){
    const random = Math.floor((Math.random() * 150) + 1);
    this.getPokemons(random);
  }

  addFavorite(pokemon){
    this.storage.set(pokemon.id, pokemon).then((successData)=>{
      console.log("Data Stored");
      this.checkFavorite();
    });
  }

  searchPokemon(ev: any){
      // set val to the value of the searchbar
      let val = ev.target.value;
      if (val != ''){
        this.getPokemons(val);
      }
  }


}
