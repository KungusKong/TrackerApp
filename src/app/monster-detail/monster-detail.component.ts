import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.scss']
})
export class MonsterDetailComponent implements OnInit {

  @Input() monster?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
