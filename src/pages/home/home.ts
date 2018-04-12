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
        console.log(this.pokemons)
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  randomPokemon(){
    const random = Math.floor((Math.random() * 150) + 1);
    this.getPokemons(random);
  }

  addFavorite(pokemon){
    console.log(pokemon); 
    this.storage.set(pokemon.id, pokemon).then((successData)=>{
      console.log("Data Stored");
      console.log(successData);
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
