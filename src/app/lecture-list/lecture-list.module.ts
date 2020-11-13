import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LectureListComponent } from './lecture-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LectureService } from '../shared/services/lecture.service';
import { AgGridModule } from 'ag-grid-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LectureListRoutingModule } from './lecture-list-routing.module';



@NgModule({
  declarations: [LectureListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents(),
    LectureListRoutingModule
  ],
  exports: [
    LectureListComponent
  ],
  providers: [
    DatePipe
  ]
})
export class LectureListModule { }
