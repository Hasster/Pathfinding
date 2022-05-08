import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BaseCommsService } from 'src/app/_BaseCommsService/base-comms.service';
import { CellComponent } from '../cell/cell.component';
import { grid_DTO_OUT } from './grid_DTO_OUT.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() gridX: number = 3;
  @Input() gridY: number = 3;
  XArray: number[] = [];
  YArray: number[] = [];
  gridArray: ElementRef[][] = [];
  cellWidth: number = 1;
  cellHeight: number = 1;
  gridState: number[][] = [];
  constructor(private el: ElementRef, private baseComms: BaseCommsService) { }

  ngOnInit(): void {
    this.baseComms.testGet();
    console.log('Grid Size is ' + this.gridX + ' by ' + this.gridY);
    this.XArray = this.makeIterationArray(this.gridX);
    this.YArray = this.makeIterationArray(this.gridY);
    this.cellWidth = this.getWidthPerCell();
    this.cellHeight = this.getHeightPerCell();
    for (let y = 0; y < this.gridY; y++) {
      this.gridState.push([] as any);
      for (let x = 0; x < this.gridX; x++) {
        this.gridState[y].push(0);
      }
    }
  }

  makeIterationArray(length: number): number[] {
    let array = [];
    for (let i = 0; i < length; i++) {
      array.push(i);
    }
    return array;
  }

  getWidthPerCell(): number {
    return this.el.nativeElement.children[0].offsetWidth / this.gridX;
  }

  getHeightPerCell(): number {
    return this.el.nativeElement.children[0].offsetHeight / this.gridX;
  }

  onCellRoleChange(roleData: number[]) {
    this.gridState[roleData[1]][roleData[0]] = roleData[2];
  }

  sendGrid() {
    var grid_dto: grid_DTO_OUT = {
      gridRoles: this.gridState
    }
    this.baseComms.sendGrid(grid_dto);
  }
}
