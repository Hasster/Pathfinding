import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathfinderUiComponent } from './pathfinder-ui/pathfinder-ui.component';
import { CellComponent } from './sub/cell/cell.component';
import { GridComponent } from './sub/grid/grid.component';
import { Grid2Component } from './grid2/grid2.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PathfinderUiComponent,
    CellComponent,
    GridComponent,
    Grid2Component
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
