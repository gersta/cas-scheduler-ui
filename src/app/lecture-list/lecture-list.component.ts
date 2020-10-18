import { Component, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Lecture } from '../shared/models/Lecture';
import { LectureDto } from '../shared/models/LectureDto';
import { LectureService } from './lecture.service';

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.scss']
})
export class LectureListComponent implements OnInit {

  // custom definitions

  lectures: Lecture[];


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

  constructor(private lectureService: LectureService) { }

  ngOnInit(): void {
    this.lectureService.getAll().subscribe(lectures => {
      this.lectures = lectures.map( (lecture: LectureDto) => {
        return {
          lectureCode: lecture.lectureCode,
          name: lecture.name,
          firstBlockStart: lecture.blocks[0].blockStart,
          firstBlockEnd: lecture.blocks[0].blockEnd,
          firstBlockLocation: lecture.blocks[0].location,
          secondBlockStart: lecture.blocks[1].blockStart,
          secondBlockEnd: lecture.blocks[1].blockEnd,
          secondBlockLocation: lecture.blocks[1].location,
        } as Lecture;
      })
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.sizeColumnsToFit();
  }

  sizeColumnsToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  resetFilters() {
    this.gridApi.setFilterModel(null);
  }

}
