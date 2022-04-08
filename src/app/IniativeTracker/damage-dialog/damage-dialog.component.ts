import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-damage-dialog',
  templateUrl: './damage-dialog.component.html',
  styleUrls: ['./damage-dialog.component.scss']
})
export class DamageDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DamageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

   result: number = 10;

  ngOnInit(): void {

  }
  async close(){
    this.dialogRef.close(0);
  }

  async dmg(){
    this.dialogRef.close(this.result);
  }
  async heal(){
    this.dialogRef.close((this.result*-1));
  }


}
