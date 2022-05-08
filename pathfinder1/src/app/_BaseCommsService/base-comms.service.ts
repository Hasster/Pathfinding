import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { grid_DTO_OUT } from '../sub/grid/grid_DTO_OUT.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseCommsService {
  private baseURL: string = 'https://localhost:5001/api/pf/';
  public pathEmitter: Subject<number[][]> = new Subject<number[][]>();
  constructor(private http: HttpClient) { }

  testGet() {
    this.http.get<boolean>(this.baseURL + 'Test').subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  sendGrid(grid_dto: grid_DTO_OUT) {
    this.pathEmitter.next([]);
    this.http.post<string[]>(this.baseURL + 'CalcGrid', grid_dto).subscribe(
      (response) => {
        console.log(response);
        var pathArr: number[][] = [];
        response.forEach(((coord) => {
          var split = coord.split(':');
          pathArr.push([+split[0], +split[1]]);
        }));
        console.log(pathArr);
        this.pathEmitter.next(pathArr);
      }
    );
  }
}
