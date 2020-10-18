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
    { field: 'firstBlockStart' },
    { field: 'firstBlockEnd' },
    { field: 'firstBlockLocation' },
    { field: 'secondBlockStart' },
    { field: 'secondBlockEnd' },
    { field: 'secondBlockLocation' },
  ];

  // define custom properties of all columns centrally in this object
  defaultColumnDefinitions: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  }

  // constructor

  constructor(private lectureService: LectureService, private downloadService: DownloadService) { }

  ngOnInit(): void {
    this.lectureService.getAll().subscribe(lectures => {
      this.lectures = lectures.map( (lecture: LectureDto) => {
        return {
          lectureCode: lecture.lectureCode,
          name: lecture.name,
          firstBlockStart: lecture.blocks[0].blockStart,
          firstBlockEnd: lecture.blocks[0].blockEnd,
          firstBlockLocation: lecture.blocks[0].location,
          firstBlockFilename: lecture.blocks[0].filename,
          secondBlockStart: lecture.blocks[1].blockStart,
          secondBlockEnd: lecture.blocks[1].blockEnd,
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
