import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./lecture-list/lecture-list.module').then(module => module.LectureListModule) },
  { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(module => module.CalendarModule) }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
