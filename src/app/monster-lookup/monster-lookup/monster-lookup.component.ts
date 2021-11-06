import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MonsterFetcherService } from 'src/app/monster-viewer/monster-fetcher.service';

@Component({
  selector: 'app-monster-lookup',
  templateUrl: './monster-lookup.component.html',
  styleUrls: ['./monster-lookup.component.scss']
})
export class MonsterLookupComponent implements OnInit {

  result = {
    url: "none",
    name: "",
    hasData: false,
    monster: {}
  };
  search = "";

  monsters = [];
  constructor(private mservice: MonsterFetcherService, public dialogRef: MatDialogRef<MonsterLookupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(window.innerWidth <= 700){
      this.dialogRef.updateSize('150%', '80%');
    }
    this.monsters = this.mservice.monsterList;
  }

  async close(){
    this.dialogRef.close(this.result);
  }
  async returnItem(item: any){
    this.result.url = item.url;
    this.result.name = item.name;
    this.result.hasData = true;
    this.result.monster = await this.mservice.getMonsterByURL(item.url);
    this.dialogRef.close(this.result);

  }

}
