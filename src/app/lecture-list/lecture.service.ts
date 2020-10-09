import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreDocument } from '../shared/models/FirestoreDocument';
import { FirestoreResponse } from '../shared/models/FirestoreResponse';

@Injectable()
export class LectureService {

  apiRoot: string = ' https://firestore.googleapis.com/v1/projects/cas-scheduler/databases/(default)/documents/lectures';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FirestoreDocument[]> {
    return this.http.get(this.apiRoot).pipe(
      map( (response: FirestoreResponse) => response.documents)
    );
  }

}
