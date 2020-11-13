import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarRoutingModule } from './calendar-routing.module';


import listPlugin from '@fullcalendar/list';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  listPlugin
]);

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
