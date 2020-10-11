import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from 'src/environments/environment.service';
import { Lecture } from '../shared/models/Lecture';

@Injectable()
export class LectureService {

  constructor(private http: HttpClient, private environment: EnvironmentService) {}

  getAll(): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(this.environment.apiRoot);
  }

}
