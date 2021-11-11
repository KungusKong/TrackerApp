import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterViewerService {

  searchOpen = false;


  constructor() { }

  invokeTrackerAdd = new EventEmitter();
  subsVar?: Subscription;

  openSearch(){
    this.searchOpen =true;
  }
  closeSearch(){
    this.searchOpen = false;
  }

  onAddFromViewer(monster: any){
    this.invokeTrackerAdd.emit(monster);
  }



}
