import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../shared/models/Lecture';
import { LectureService } from './lecture.service';

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.scss']
})
export class LectureListComponent implements OnInit {

  lectures: Lecture[];

  constructor(private lectureService: LectureService) { }

  ngOnInit(): void {
    this.lectureService.getAll().subscribe(documents => {
      this.lectures = documents.map(document => {
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

}
