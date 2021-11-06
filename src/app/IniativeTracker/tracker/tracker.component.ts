import { Component, OnInit, OnDestroy, HostListener, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Tracker } from 'src/app/models/tracker.model';
import { MonsterViewerService } from 'src/app/services/monster-viewer.service';
import { RoomService } from 'src/app/services/room.service';
import { InitiativeItem} from '../InitiativeItem';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
tracker: Tracker = {id: '', createdBy:'',turn: 1,round: 1, items: []};
items: InitiativeItem [] = [];
start: boolean = false;

private _trackerSub?: Subscription;


  constructor(private roomService: RoomService, private viewerService: MonsterViewerService) { 
    this.viewerService.openSearch();
  }

  public spotInOrder = 1;

  


  ngOnInit(): void {
    this._trackerSub = this.roomService.currentTracker.pipe(startWith({id: '', createdBy:'',turn: 1, round: 1, items: []})).subscribe(tracker=> {
      return this.tracker = tracker;
    });
    
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }
  ngOnDestroy(): void {
    if(this._trackerSub)
    this._trackerSub.unsubscribe();
    this.leavewithoutReload();
    this.viewerService.closeSearch();
  }

  clearItems(): void{
    this.items = [];
    this.spotInOrder = 1;
    this.tracker.round = 1;
    this.refreshServer();
  }

  nextTurn(): void{
    this.spotInOrder++;
    if(this.spotInOrder > this.items.length){
      this.tracker.round++;
      this.spotInOrder = 1;
    }
    this.refreshServer();
  }

  /**
   * Sorts Items by iniative roll. 
   * Items with the same roll are marked as above.
   * 
   * 
   */
  sortItems(): void{
    this.items.sort((a,b) => b.roll-a.roll)
    for(let i = 0; i < this.items.length; i++){
      this.items[i].order = i+1;
    }
    for(let i = 0; i < this.items.length; i++){
      this.items[i].showMove = this.aboveInitativeSame(this.items[i].order);
    }

  }
  removeItem(order: number): boolean{
    
    this.items.splice(order-1, 1);
    this.sortItems();
    this.refreshServer();
    return false;
  }

  moveUp(order: number): void {
    if(order >1 && this.items.length >1){ // checks if this isnt the first one in the list and if the length of items is greater than 1
      //console.log(this.items[order-1].name + " "+ this.items[order-2].name);
      if(this.aboveInitativeSame(order)){ // if the roll from the one higher than order is the same as order

        let temp: InitiativeItem;
        temp = this.items[order-1]; // the item where the button was clicked

        this.items[order-1] = this.items[order-2];
        this.items[order-2] = temp;

        this.sortItems();
      }

    }
    this.refreshServer();
  }
  duplicate(order: number): void{
    console.log("Duplicate: "+ order);
    if(order >0){
      
      let temp : InitiativeItem;
      temp = {
        roll: this.items[order-1].roll,
        url: this.items[order-1].url,
        name: this.items[order-1].name,
        hp: this.items[order-1].hp,
        order: this.items[order-1].order,
        showMove: this.items[order-1].showMove,
        notes: this.items[order-1].notes
      }
      console.log("Duplicating: "+ temp.name);
      this.addItem(temp);

    }
  }

  aboveInitativeSame(order: number): boolean{

    if(order>1){
      if(this.items[order-1].roll == this.items[order-2].roll){
        return true;
      }

    }
    
    return false;
  }


  addBlankItem(): void{
    let temp: InitiativeItem={
      roll: 1,
      url: "none",
      name: "Name",
      hp: 20,
      order: 1,
      showMove: false,
      notes: ""
  };
   this.addItem(temp);
    
  }
  addItem(temp: InitiativeItem){
    this.items.push(temp);
    this.sortItems();
    this.refreshServer();
  }

  createRoom(){
    
    this.roomService.newTracker();
    this.start = true;
  }

  refreshServer(){

    this.tracker.items = this.items;
    this.tracker.turn = this.spotInOrder;
    this.roomService.editTracker(this.tracker);

  }

  leave(){
    this.roomService.closeRoom(this.tracker.id);
    window.location.reload();
  }
  leavewithoutReload(){
    this.roomService.closeRoom(this.tracker.id);
    this.roomService.reconnect();
  }

  



}
