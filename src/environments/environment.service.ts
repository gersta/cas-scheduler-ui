import { Injectable } from "@angular/core";
import { AbstractEnvironment } from './abstract-environment';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService implements AbstractEnvironment {

  get production() {
    return environment.production;
  }

  get apiRoot() {
    return environment.apiRoot;
  }

  lectures: string;
  ics: string;

}
