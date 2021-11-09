import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  autoNaming = true;
  autoAC = true;
  autoInitRoll = true;
  autoHealthRoll = false;
  autoAvgHealth = true;

  constructor(public settingS: SettingsService, public dialogRef: MatDialogRef<SettingsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.updateSettingsFromService();

  }


  async close(){
    this.dialogRef.close();
  }

  updateSettingsFromService(){
    this.autoNaming = this.settingS.autoNaming;
    this.autoAC = this.settingS.acNote;
    this.autoInitRoll =this.settingS.autoRollInit;
    this.autoHealthRoll = this.settingS.autoRollHealth;
    this.autoAvgHealth = this.settingS.autoAvgHealth;

  }

  checkNaming(event: any){
    this.settingS.setAutoNaming(event.currentTarget.checked);
    this.updateSettingsFromService();
  }
  checkAC(event: any){
    this.settingS.setACNote(event.currentTarget.checked);
    this.updateSettingsFromService();
  }
  checkInitRoll(event: any){
    this.settingS.setAutoRollInit(event.currentTarget.checked);
    this.updateSettingsFromService();
  }
  checkHealthRoll(event: any){
    this.settingS.setAutoRollHealth(event.currentTarget.checked);
    this.updateSettingsFromService();
  }
  checkAvgHealth(event: any){
    this.settingS.setautoAvgHealth(event.currentTarget.checked);
    this.updateSettingsFromService();
  }

}
