import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() {
    let aN = sessionStorage.getItem('autoNaming');
    if(aN!=null){
      this.autoNaming = JSON.parse(aN);
    }
    let ac = sessionStorage.getItem('acNote');
    if(ac!=null){
      this.acNote = JSON.parse(ac);
    }
    let aRI = sessionStorage.getItem('autoRollInit');
    if(aRI!=null){
      this.autoRollInit = JSON.parse(aRI);
    }
    let aRH = sessionStorage.getItem('autoRollHealth');
    if(aRH!=null){
      this.autoRollHealth = JSON.parse(aRH);
    }
    let aAH = sessionStorage.getItem('autoAvgHealth');
    if(aAH!=null){
      this.autoAvgHealth = JSON.parse(aAH);
    }

   }

  public autoNaming = true;
  public acNote = true;
  public autoRollInit = true;
  public autoRollHealth = false;
  public autoAvgHealth = true;

  public setAutoNaming(tf: boolean){
    this.autoNaming = tf;
    sessionStorage.setItem('autoNaming',''+tf);
  }
  public setACNote(tf: boolean){
    this.acNote = tf;
    sessionStorage.setItem('acNote',''+tf);
  }
  public setAutoRollInit(tf: boolean){
    this.autoRollInit = tf;
    sessionStorage.setItem('autoRollInit',''+tf);
  }
  public setAutoRollHealth(tf: boolean){
    this.autoRollHealth = tf;
    if(tf){
      this.autoAvgHealth = false;
    }
    sessionStorage.setItem('autoRollHealth',''+this.autoRollHealth);
    sessionStorage.setItem('autoAvgHealth',''+this.autoAvgHealth);
  }
  public setautoAvgHealth(tf: boolean){
    this.autoAvgHealth = tf;
    if(tf){
      this.autoRollHealth = false;
    }
    sessionStorage.setItem('autoAvgHealth',''+this.autoAvgHealth);
    sessionStorage.setItem('autoRollHealth',''+this.autoRollHealth);
  }

}
