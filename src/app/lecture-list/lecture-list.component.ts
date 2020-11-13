import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, ColumnApi, FilterChangedEvent, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { FileTypes } from '../shared/models/file-types.enum';
import { Lecture } from '../shared/models/lecture';
import { LectureDto } from '../shared/models/lecture.dto';
import { CalendarService } from '../shared/services/calendar.service';
import { DownloadService } from '../shared/services/download.service';
import { LectureService } from '../shared/services/lecture.service';

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.scss']
})
export class LectureListComponent implements OnInit {

  // custom definitions

  lectures: Lecture[];

  isFilterPresent: boolean = false;
  isMenuVisible: boolean = false;


  // ag grid definitions
  gridApi: GridApi;
  gridColumnApi: ColumnApi;

  columns: ColDef[] = [
    { field: 'lectureCode' },
    { field: 'name' },
    { field: 'firstBlockStart', filter: false }, // disable filtering for now as view and date model diverge
    { field: 'firstBlockEnd', filter: false }, // disable filtering for now as view and date model diverge
    { field: 'firstBlockLocation' },
    { field: 'secondBlockStart', filter: false }, // disable filtering for now as view and date model diverge
    { field: 'secondBlockEnd', filter: false }, // disable filtering for now as view and date model diverge
    { field: 'secondBlockLocation' },
  ];

  // define custom properties of all columns centrally in this object
  defaultColumnDefinitions: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  }


  // constructor

  constructor(
    private lectureService: LectureService,
    private downloadService: DownloadService,
    private calendarService: CalendarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lectureService.getAll().subscribe(lectures => {
      this.lectures = lectures.map( (lecture: LectureDto) => {
        return {
          lectureCode: lecture.lectureCode,
          name: lecture.name,
          firstBlockStart: lecture.blocks[0].blockStart, //this.datePipe.transform(lecture.blocks[0].blockStart, 'fullDate'),
          firstBlockEnd: lecture.blocks[0].blockEnd, //this.datePipe.transform(lecture.blocks[0].blockEnd, 'fullDate'),
          firstBlockLocation: lecture.blocks[0].location,
          firstBlockFilename: lecture.blocks[0].filename,
          secondBlockStart: lecture.blocks[1].blockStart, //this.datePipe.transform(lecture.blocks[1].blockStart, 'fullDate'),
          secondBlockEnd: lecture.blocks[1].blockEnd, //this.datePipe.transform(lecture.blocks[1].blockEnd, 'fullDate'),
          secondBlockLocation: lecture.blocks[1].location,
          secondBlockFilename: lecture.blocks[1].filename
        } as Lecture;
      })
    });
  }


  // AG GRID events
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.sizeColumnsToFit();
  }

  onSelectionChanged($event: SelectionChangedEvent) {
    const lectures = this.gridApi.getSelectedRows() as Lecture[];

    this.isMenuVisible = (lectures.length > 0);
  }

  onFilterChanged($event: FilterChangedEvent) {
    this.isFilterPresent = this.gridApi.isAnyFilterPresent();
  }


  // AG GRID actions
  sizeColumnsToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  resetFilters() {
    this.gridApi.setFilterModel(null);
  }

  // CUSTOM actions
  download() {
    const lectures = this.gridApi.getSelectedRows() as Lecture[];

    lectures.forEach(lecture => {
      const { firstBlockFilename, secondBlockFilename } = lecture;

      this.downloadService.download(firstBlockFilename, FileTypes.ICS);
      this.downloadService.download(secondBlockFilename, FileTypes.ICS);
    });
  }

  calendar() {
    const lectures = this.gridApi.getSelectedRows() as Lecture[];

    this.calendarService.setEvents(lectures);

    this.router.navigate(['calendar'])
  }

}
