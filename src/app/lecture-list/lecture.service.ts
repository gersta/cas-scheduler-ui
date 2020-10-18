import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from 'src/environments/environment.service';
import { LectureDto } from '../shared/models/LectureDto';


@Injectable()
export class LectureService {

  constructor(private http: HttpClient, private environment: EnvironmentService) {}

  getAll(): Observable<LectureDto[]> {
    return this.http.get<LectureDto[]>(this.environment.apiRoot);
  }

}
