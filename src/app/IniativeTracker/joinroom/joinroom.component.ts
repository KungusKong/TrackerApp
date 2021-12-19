import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-joinroom',
  templateUrl: './joinroom.component.html',
  styleUrls: ['./joinroom.component.scss']
})
export class JoinroomComponent implements OnInit {
  tracker?: any;
  error: string = "";
  private _trackerSub?: Subscription
  private errorSub?: Subscription;
  private closedSub?: Subscription;
  start = false;
  id: string = "";
  roomClosed = false;


  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this._trackerSub = this.roomService.currentTracker.pipe(startWith({id:'',turn: 1, items: []})).subscribe(tracker=> this.tracker = tracker);
    this.errorSub = this.roomService.errors.pipe(startWith("")).subscribe(error => this.error = error);
    this.closedSub = this.roomService.roomClosed.pipe(startWith(false)).subscribe(msg => {this.roomClosed = msg; 
      if(this.roomClosed)
        this.refresh();
    });
  }
  ngOnDestroy(): void {
    if(this._trackerSub)
    this._trackerSub.unsubscribe();
    if(this.errorSub)
    this.errorSub.unsubscribe();
    if(this.closedSub)
    this.closedSub.unsubscribe();
  }
 

  joinRoom(){
    this.error = "";
    this.start = true;
    this.roomService.getTracker(this.id.toUpperCase());
  }

  inRoom(): boolean{
    if(this.error =="" && this.start){
      return true;
    }
    return false;
  }
  logTracker() {
    console.log(JSON.stringify(this.tracker));
  }
  currentTurn(): string{
    for(let item of this.tracker.items){
      if(item.order == this.tracker.turn){
        return item.name;
      }
    }
    return "";
  }

  refresh(){
    window.location.reload();
  }

}
