import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InitiativeItem} from '../InitiativeItem';


@Component({
  selector: 'app-initiative-item',
  templateUrl: './initiative-item.component.html',
  styleUrls: ['./initiative-item.component.scss']
})
export class InitiativeItemComponent implements OnInit {


 @Input() item: InitiativeItem={
  roll: 1,
  url: "none",
  name: "Name",
  hp: 20,
  order: 1,
  showMove: false,
  notes: ""
  };
 @Input() selected = 1;

 @Output("sortItems") sortItems: EventEmitter<any> = new EventEmitter();
 @Output("removeItems") removeItems: EventEmitter<any> = new EventEmitter();
 @Output("moveUp") moveUp: EventEmitter<any> = new EventEmitter();
 @Output("duplicate") duplicate: EventEmitter<any> = new EventEmitter();
 @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
 
 
   sort(): void{
    this.sortItems.emit();
    this.refresh.emit();
  }
  
  remove(): void{
    if(this.item){

      this.removeItems.emit(this.item.order);
    }
    this.refresh.emit();
  }
  moveUpwards(): void{
    if(this.item){

      this.moveUp.emit(this.item.order);
    }
    this.refresh.emit();
  }

  dup(): void{
    if(this.item){
      this.duplicate.emit(this.item.order);
    }
    this.refresh.emit();
  }

  edit(){
    this.refresh.emit();
  }

  constructor() { }

  ngOnInit(): void {
    
  }

}
