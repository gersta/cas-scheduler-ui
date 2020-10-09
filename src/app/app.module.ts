import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LectureListModule } from './lecture-list/lecture-list.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LectureListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
