import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseCommsService } from 'src/app/_BaseCommsService/base-comms.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() height: number = 10;
  @Input() width: number = 10;
  @Input() XAddress: number = 0;
  @Input() YAddress: number = 0;
  @Output() roleChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @ViewChild('cell') cellDiv: any;
  pathSubscription: Subscription | undefined;
  cellContents: string = '';
  DivElement!: ElementRef;
  cellRole: number = 0;//0-none,1-obstacle,2-start,3-end
  isDebugMode = false;

  constructor(private baseComms: BaseCommsService) { }
  ngOnDestroy(): void {
    this.pathSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.pathSubscription = this.baseComms.pathEmitter.subscribe(
      (pathArr) => {
        this.cellContents = '';
        pathArr.forEach(// toDo: replace with .find()
          (coords: number[], index: number) => {
            if (coords[0] === this.XAddress && coords[1] === this.YAddress) {
              this.cellContents = index.toString();
            }
          }
        );
      }
    )
  }

  ngAfterViewInit(): void {
    this.DivElement = this.cellDiv;
    this.DivElement.nativeElement.style.width = this.width + 'px';
    this.DivElement.nativeElement.style.height = this.height + 'px';
  }

  handleRoleChange(event: any) {
    let e = event as PointerEvent;
    e.preventDefault();
    if (!e.ctrlKey && !e.altKey) {
      if (this.cellRole === 0) {
        this.cellRole = 1;
        this.DivElement.nativeElement.className = "selected";
      } else {
        this.cellRole = 0;
        this.DivElement.nativeElement.className = "gridCell";
      }
    } else if (e.ctrlKey) {
      this.cellRole = 2;
      this.DivElement.nativeElement.className = "start";
    } else if (e.altKey) {
      this.cellRole = 3;
      this.DivElement.nativeElement.className = "end";
    }
    this.roleChange.next([this.XAddress, this.YAddress, this.cellRole]);
  }

  mouseEnter(event: any) {
    // console.log(event);
    let e = event as PointerEvent;
    if (e.button == 0 && e.buttons == 1) {
      this.handleRoleChange(event);
    }
  }

  mouseClick(event: any) {
    this.handleRoleChange(event);
  }

}
