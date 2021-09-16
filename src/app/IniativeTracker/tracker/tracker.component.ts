import { Component, OnInit } from '@angular/core';
import { InitiativeItem} from '../InitiativeItem';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

items: InitiativeItem [] = [];

  constructor() { }

  public spotInOrder = 1;

  


  ngOnInit(): void {
  }

  clearItems(): void{
    this.items = [];
    this.spotInOrder = 1;
  }

  nextTurn(): void{
    this.spotInOrder++;
    if(this.spotInOrder > this.items.length){
      this.spotInOrder = 1;
    }
    
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
  }
  duplicate(order: number): void{
    console.log("Duplicate: "+ order);
    if(order >0){
      
      let temp : InitiativeItem;
      temp = {
        roll: this.items[order-1].roll,
        name: this.items[order-1].name,
        hp: this.items[order-1].hp,
        order: this.items[order-1].order,
        showMove: this.items[order-1].showMove
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
      name: "Name",
      hp: 20,
      order: 1,
      showMove: false
  };
   this.addItem(temp);
    
  }
  addItem(temp: InitiativeItem){
    this.items.push(temp);
    this.sortItems();
  }

}
