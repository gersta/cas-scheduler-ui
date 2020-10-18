import { Injectable } from "@angular/core";
import { EnvironmentService } from 'src/environments/environment.service';
import { FileTypes } from '../models/file-types.enum';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private environmentService: EnvironmentService) {}

  download(filename: string, type: FileTypes) {
    const a = document.createElement("a");
    let href = this.environmentService.apiRoot;

    if ( type == FileTypes.ICS ) {
      a.href = `${href }/ics/${filename}`;
    }

    a.setAttribute("download", filename);
    a.click();
  }

}
