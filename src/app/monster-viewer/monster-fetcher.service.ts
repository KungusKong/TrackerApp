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
  selectedMonster: any = {};
  baseURL = "https://www.dnd5eapi.co";
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

  async getMonsterByURL(url: string){
    let lurl = this.baseURL+url;
    await this.http.get(lurl).toPromise().then(data => {console.log("Fetched: "+data);
      //this.items = JSON.parse(JSON.stringify(data));
      this.selectedMonster = data;
      
      //return this.items;
    });
    return this.selectedMonster;
  }

}
