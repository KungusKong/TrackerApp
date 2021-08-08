import { Injectable } from '@angular/core';
import { Monster_Short } from './monster_short';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonsterFetcherService {

  mShort? : Monster_Short[];
  constructor( private http: HttpClient) { }

  getMonsters(){
    
  }

}
