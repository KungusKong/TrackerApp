import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { InitiativeItem } from '../IniativeTracker/InitiativeItem';
import { Tracker } from '../models/tracker.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private socket: Socket) { }

  currentTracker = this.socket.fromEvent<Tracker>('tracker');
  errors = this.socket.fromEvent<string>('error');
  roomClosed = this.socket.fromEvent<boolean>('roomClosed');

  getTracker(id: string){
    this.socket.emit('getTracker', id);
  }

  newTracker(){
    this.socket.emit('addTracker', {id: '', createdBy:'',turn: 1, round: 1, items: []})
  }
  editTracker(tracker: Tracker){
    this.socket.emit('editTracker', tracker);
  }

  blankTrackerItem(){
    
    let tracker: Tracker = {id: '', createdBy:'',turn: 1, round: 1, items: []};
    return tracker;
  }

  disconnect(){
    this.socket.disconnect();
  }
  closeRoom(id: string){
    this.socket.emit('closeRoom', id);
    this.disconnect();
  }






}
