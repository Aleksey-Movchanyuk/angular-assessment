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

  evenInteger = 3
  oddInteger = 6;

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
      this.mainLogic()
  }

  ngOnInit() {
    this.mainLogic()
  }

  mainLogic() {
    // generate new empty array with N blocks
    this.myArray = new Array(Number(this.n)) 

    // calculate even, odd blocks width
    this.oddBlockWidth = ((100 / this.n) * 1.25)
    this.evenBlockWidth = this.oddBlockWidth / 2

    // calculate even, odd blocks integer
    this.oddInteger = this.isOdd(Math.ceil(Math.trunc(this.s / this.n) * (1 + (1 / this.k)))) ? 
                        Math.ceil(Math.trunc(this.s / this.n) * (1 + (1 / this.k))) + 1: Math.ceil(Math.trunc(this.s / this.n) * (1 + (1 / this.k)));
    this.evenInteger = this.oddInteger / this.k

    if (!this.isInt(this.evenInteger ))
      this.disperseResult = false;
    else 
      this.disperseResult = true;
  }

  isOdd(num: number) { return num % 2;}

  isInt(num: number) { return num % 1 === 0; }


}
