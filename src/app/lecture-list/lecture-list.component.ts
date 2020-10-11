import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AgGridColumn } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridParams, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Lecture } from '../shared/models/Lecture';
import { LectureService } from './lecture.service';

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.scss']
})
export class LectureListComponent implements OnInit {

  // custom definitions

  lectures$: Observable<Lecture[]>;


  // ag grid definitions

  gridApi: GridApi;
  gridColumnApi: ColumnApi;

  columns = [
    { field: 'name', sortable: true, filter: true, checkboxSelection: true },
    { field: 'firstBlockStart', sortable: true, filter: true,  },
    { field: 'firstBlockEnd', sortable: true, filter: true,  },
    { field: 'firstBlockLocation', sortable: true, filter: true,  },
    { field: 'secondBlockStart', sortable: true, filter: true,  },
    { field: 'secondBlockEnd', sortable: true, filter: true,  },
    { field: 'firstBlockLocation', sortable: true, filter: true,  },
  ];

  // constructor

  constructor(private lectureService: LectureService) { }

  ngOnInit(): void {
    this.lectures$ = this.lectureService.getAll();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.sizeColumnsToFit();
  }

  sizeColumnsToFit() {
    this.gridApi.sizeColumnsToFit();
  }

}
