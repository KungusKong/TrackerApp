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
  public monsterList: any =[];
  public selectedMonster: any = {};
  baseURL = "https://www.dnd5eapi.co";
  apiURL = "https://www.dnd5eapi.co/api/monsters/";
  mShort? : Monster_Short[] = [];
  
  constructor( private http: HttpClient) { }

  async getMonstersShort(): Promise<any[]>{
    await this.http.get(this.apiURL).toPromise().then(data => {
    //this.items = JSON.parse(JSON.stringify(data));
    this.items = data;
    //console.log("Service: "+this.items[0]);
    //return this.items;
  });
  this.monsterList = this.items.results;
  return this.monsterList;
  
    //return null;
  }

  async getMonsterByURL(url: string){
    let lurl = this.baseURL+url;
    await this.http.get(lurl).toPromise().then(data => {console.log();
      //this.items = JSON.parse(JSON.stringify(data));
      this.selectedMonster = data;
      
      //return this.items;
    });
    return this.selectedMonster;
  }

}
