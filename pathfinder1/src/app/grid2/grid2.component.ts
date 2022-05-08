import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid2',
  templateUrl: './grid2.component.html',
  styleUrls: ['./grid2.component.css']
})
export class Grid2Component implements OnInit {

  constructor() { }

  fieldArray:number[][]=[];
  mapSize:number=10;
  ngOnInit(): void {
    for(let i=0;i<this.mapSize;i++){
      
    }
  }

}
