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

  lectures: Lecture[];


  // ag grid definitions

  gridApi: GridApi;
  gridColumnApi: ColumnApi;

  columns = [
    { field: 'name', sortable: true, filter: true, checkboxSelection: true },
    { field: 'start', sortable: true, filter: true,  },
    { field: 'end', sortable: true, filter: true,  },
    { field: 'location', sortable: true, filter: true,  },
  ];

  // constructor

  constructor(private lectureService: LectureService) { }

  ngOnInit(): void {
    this.lectureService.getAll().subscribe(documents => {
      this.lectures = documents.map( (document, index) => {
        let lecture: Lecture = {
          name: document.fields.name.stringValue,
          start: document.fields.start.stringValue,
          end: document.fields.end.stringValue,
          location: document.fields.location.stringValue
        }

        return lecture;
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

}
