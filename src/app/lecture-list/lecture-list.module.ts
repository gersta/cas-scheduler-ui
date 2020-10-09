import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectureListComponent } from './lecture-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LectureService } from './lecture.service';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [LectureListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents()
  ],
  exports: [
    LectureListComponent
  ],
  providers: [
    LectureService
  ]
})
export class LectureListModule { }
