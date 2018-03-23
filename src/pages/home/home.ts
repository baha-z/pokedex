import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})

export class HomePage {

  searchQuery: string = '';
  pokemons: any = [];

  constructor(public navCtrl: NavController, public pokeprovider: PokeapiProvider) {
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.pokemons = this.pokemons.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  searchPokemon(ev: any){
      // set val to the value of the searchbar
      let val = ev.target.value;
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

}
