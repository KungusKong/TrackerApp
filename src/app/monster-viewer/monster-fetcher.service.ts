import { Injectable } from '@angular/core';
import { Monster_Short } from './monster_short';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterFetcherService {

  items: any = [];
  apiURL = "https://www.dnd5eapi.co/api/monsters/";
  mShort? : Monster_Short[] = [];
  
  constructor( private http: HttpClient) { }

  async getMonstersShort(): Promise<any[]>{
    await this.http.get(this.apiURL).toPromise().then(data => {console.log(data);
    //this.items = JSON.parse(JSON.stringify(data));
    this.items = data;
    //console.log("Service: "+this.items[0]);
    //return this.items;
  });
    
  
  return this.items.results;
  
    //return null;
  }

}
