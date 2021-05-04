import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  n = 4;
  s = 18;
  k = 2;

  selectedBlock: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  selectedBlockUpdate(blockIndex: number) {
    this.selectedBlock = blockIndex;

  }

}
