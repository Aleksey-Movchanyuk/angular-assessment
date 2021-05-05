import { Component, OnChanges, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail',
  inputs: ['n', 's', 'k'],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnChanges, OnInit {

  private _n = 4;
  private _s = 18;
  private _k = 2;


  myArray = new Array(this._n);

  evenBlockWidth = 15;
  oddBlockWidth = 35;

  even = 3
  odd = 6;
  reminder = 0;

  disperseResult = true;


  @Input()
  set n(n: number) { this._n = n;}
  get n(): number { return this._n; }

  @Input()
  set s(s: number) { this._s = s;}
  get s(): number { return this._s; }

  @Input()
  set k(k: number) { this._k = k;}
  get k(): number { return this._k; }

  @Output() selectedBlockUpdate: EventEmitter<number> = new EventEmitter<number>();
  updateParent(selectedBlock: number){
    this.selectedBlockUpdate.emit(selectedBlock);
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {

    // Checking is it the init changes
    var firstChanges: boolean = true;

    for (let property in changes) {
        if (property === 'n' || property === 's' || property === 'k' ) {
          
          firstChanges = changes[property].firstChange === false ? changes[property].firstChange : true;
        } 
    }

    if (!firstChanges) 
      this.allocation()
  }

  ngOnInit() {
    this.allocation()
  }

  allocation() {

    // cast to numbers
    this.n = Number(this.n);
    this.s = Number(this.s);
    this.k = Number(this.k);

    // generate new empty array with N blocks
    this.myArray = new Array(Number(this.n)) 

    switch(this.n) {
      case 1:
        // calculate even, odd blocks width
        this.evenBlockWidth = 100;

        // allocation logic
        this.even = this.s;

        break;

      case 2:
        // calculate even, odd blocks width
        this.oddBlockWidth = (100 / this.n) * 1.25;
        this.evenBlockWidth = this.oddBlockWidth / 2;

        // allocation logic
        this.even = this.s / (this.k + 1);
        this.odd = this.even * this.k;

        // check final result
        if (!this.isInt(this.even) || !this.isInt(this.odd))
          this.disperseResult = false;
        else 
          this.disperseResult = true;
          
        break;

      default:
        // calculate even, odd blocks width
        this.oddBlockWidth = (100 / this.n) * 1.25;
        this.evenBlockWidth = this.oddBlockWidth / 2;

        // allocation logic
        let amountOfBlockParts = Math.trunc((this.n / 2) + (this.n * this.k) / 2);

        this.even = Math.trunc(this.s / amountOfBlockParts)
        this.odd = this.even * this.k;


        // check if result have the reminder
        if (!this.isInt(this.s / amountOfBlockParts))
          this.reminder = this.s - (this.even * (this.n + Math.trunc(this.n / this.k)));
        else 
          this.reminder = 0;

        if (!this.isInt(this.even) || !this.isInt(this.odd) || !this.isInt(this.reminder))
          this.disperseResult = false;
        else 
          this.disperseResult = true;

        break;

    }
  }

  isOdd(num: number) { return num % 2; }

  isInt(num: number) { return num % 1 === 0; }


}
