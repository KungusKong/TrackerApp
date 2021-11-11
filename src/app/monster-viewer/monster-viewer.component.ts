
import { Component, OnInit } from '@angular/core';
import { MonsterFetcherService } from './monster-fetcher.service';
import { Monster_Short } from './monster_short';
import { MatIcon } from '@angular/material/icon';
import { JsonpClientBackend } from '@angular/common/http';
import { MonsterFilterPipe } from '../monster-filter.pipe';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MonsterDetailComponent } from '../monster-detail/monster-detail.component';
import { MonsterViewerService } from '../services/monster-viewer.service';
import { TrackerComponent } from '../IniativeTracker/tracker/tracker.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.scss']
})
export class MonsterViewerComponent implements OnInit {

  constructor(private mService: MonsterFetcherService, public dialog: MatDialog, private viewerService: MonsterViewerService, private roomService: RoomService) { 
   }
  items: any[] = [];
  ms : any[] = [];
  monster: any;
  titem: any;
  search: string = "";
  monsters: Monster_Short[] = [];

  m: any;

  ngOnInit(): void {
    this.getMonsters();
  }


  async selectMonster(url: string){
    
    this.monster = await this.mService.getMonsterByURL(url);

  }

  selectItem(ite: any){
    this.titem = ite;
    this.openDialog();
   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MonsterDetailComponent, {
      width: '1px',
      height: '1px',
      data: {item: this.titem},
      panelClass: 'modal-content'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reset();
    });
  }

  

  async getMonsters() {
    //this.monsters = this.mService.getMonstersShort(); 
    //this.mService.getMonstersShort().subscribe(monsters => this.monsters = monsters);
    this.items= await this.mService.getMonstersShort();
    
    
    //this.ms = this.items[1];
  }
  resolveAfter2Seconds(x:any) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  reset(){
    this.titem = null;
  }

  addToItem(ite: any){
      this.viewerService.onAddFromViewer(ite);
  }

  inRoom(): boolean{
    //console.log(JSON.stringify(this.roomService.currentTracker));
    if(this.roomService.currentTracker){
      return true;
    }
    return false;
  }

  


  

}
