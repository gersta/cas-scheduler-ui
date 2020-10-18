import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LectureListComponent } from './lecture-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LectureService } from '../shared/services/lecture.service';
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
    DatePipe
  ]
})
export class LectureListModule { }
