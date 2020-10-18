import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { FileTypes } from '../shared/models/file-types.enum';
import { Lecture } from '../shared/models/lecture';
import { LectureDto } from '../shared/models/lecture.dto';
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

  isDownloadVisible: boolean = false;


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

  constructor(private lectureService: LectureService, private downloadService: DownloadService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.lectureService.getAll().subscribe(lectures => {
      this.lectures = lectures.map( (lecture: LectureDto) => {
        return {
          lectureCode: lecture.lectureCode,
          name: lecture.name,
          firstBlockStart: this.datePipe.transform(lecture.blocks[0].blockStart, 'fullDate'),
          firstBlockEnd: this.datePipe.transform(lecture.blocks[0].blockEnd, 'fullDate'),
          firstBlockLocation: lecture.blocks[0].location,
          firstBlockFilename: lecture.blocks[0].filename,
          secondBlockStart: this.datePipe.transform(lecture.blocks[1].blockStart, 'fullDate'),
          secondBlockEnd: this.datePipe.transform(lecture.blocks[1].blockEnd, 'fullDate'),
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

    this.isDownloadVisible = (lectures.length > 0);
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

}
