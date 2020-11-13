import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarService } from '../shared/services/calendar.service';
import { FullcalendarViews } from './views.enum';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: FullcalendarViews.LIST_YEAR,
  }

  constructor(private calenderService: CalendarService, private router: Router) { }

  ngOnInit(): void {
    this.calendarOptions.events = this.calenderService.getEvents();
    console.log(this.calendarOptions.events)
  }

  /**
   * resets the fullcalendar API and thus the view
   * also resets the calendarService to remove the current selection
   * finally navigates to the home screen to allow the user to do a new selection
   */
  resetCalendar(): void {
    this.calenderService.setEvents([]);
    this.calendarOptions.events = [];

    this.router.navigate(['/'])
  }

}
