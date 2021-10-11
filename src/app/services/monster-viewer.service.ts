import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterViewerService {

  searchOpen = true;

  constructor() { }

  openSearch(){
    this.searchOpen =true;
    console.log("Search Now Open");
  }
  closeSearch(){
    this.searchOpen = false;
    console.log("Search Now Closed");
  }



}
