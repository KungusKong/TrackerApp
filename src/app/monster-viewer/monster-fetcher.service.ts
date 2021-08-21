import { Injectable } from '@angular/core';
import { Monster_Short } from './monster_short';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterFetcherService {

  items = [];
  apiURL = "https://www.dnd5eapi.co/api/monsters/";
  mShort? : Monster_Short[] = [];
  
  constructor( private http: HttpClient) { }

  getMonstersShort(): any[]{
    this.http.get(this.apiURL).toPromise().then(data => {console.log(data);

    for(let key in data){
      if(data.hasOwnProperty(key))
        this.items.push(data[key as never])
    }
  });
  return this.items;
    //return null;
  }

}
