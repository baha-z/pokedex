import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PokeapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PokeapiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PokeapiProvider Provider');
  }

  getPokemon(name) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

}
