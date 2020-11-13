import { Injectable } from "@angular/core";
import { CalendarEntry } from 'src/app/calendar/calendar-entry.model';
import { Lecture } from '../models/lecture';

/**
 * Intermediary class to communicate the selected lectures to the calendar component
 */
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // get and set must have the same type, thus the getters and setters are implemented in more java style to allow
  // for different types
  _events: Set<CalendarEntry> = new Set();

  setEvents(lectures: Lecture[]): void {
    lectures.forEach(lecture => {
      this._events.add({
        title: lecture.name,
        start: lecture.firstBlockStart,
        end: lecture.firstBlockEnd
      });
      this._events.add({
        title: lecture.name,
        start: lecture.secondBlockStart,
        end: lecture.secondBlockEnd
      });
    })
  }

  /**
   * the fullcalendar API expects an array of values to come back
   */
  getEvents(): CalendarEntry[] {
    return Array.from(this._events.values());
  }

}
