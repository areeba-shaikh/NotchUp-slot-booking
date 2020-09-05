import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Course } from '../course';
import { CourseService } from '../course.service';


import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { Slot } from '../slot';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-slot-booking-form',
  templateUrl: './slot-booking-form.component.html',
  styleUrls: ['./slot-booking-form.component.css']
})
export class SlotBookingFormComponent implements OnInit {
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  coursesFromServer: Course[] = [];
  dateFilter = (date: Date): boolean => { return false; }
  avaialbleCourseNames = ['Game Development Jr',
    'Game Development',
    'App Development',
    'Web Development',
    'Python Programming',
    'Artificial Intelligence'];
  availableTimeSlots: Slot[] = [];
  filteredTimeSlots: Slot[] = [];
  minDate: Date;
  maxDate: Date;
  constructor(private courseService: CourseService, private _snackBar: MatSnackBar) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentDate = new Date();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setHours(this.minDate.getHours() + 4);
    this.maxDate.setDate(currentDate.getDate() + 7);
  }

  ngOnInit(): void {
    this.user = {
      parentsName: "",
      parentsContactNumber: "",
      parentsEmailid: "",
      childsName: "",
      childsAge: 5,
      courseName: "",
      suitableDate: "",
      suitableTimeSlot: ""
    }
    this.getCourses();
  }

  user: User;

  onSubmitTemplateBased() {
    this.validate();
    this.user = {
      parentsName: "",
      parentsContactNumber: "",
      parentsEmailid: "",
      childsName: "",
      childsAge: 5,
      courseName: "",
      suitableDate: "",
      suitableTimeSlot: ""
    }
    this._snackBar.open("Slot booked", "OK", {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

  validate(): boolean {
    return true;
  }
  getCourses() {
    this.courseService.getCourses()
      .subscribe((data: Course[]) => {

        this.coursesFromServer = data;
      });
  }
  onDateSelect(selected) {
    this.user.suitableTimeSlot = undefined;
    let selectedDate = new Date(selected.value);
    this.filteredTimeSlots = [];
    for (let j = 0; j < this.availableTimeSlots.length; j++) {
      let availableDate = new Date(Number(this.availableTimeSlots[j].slot));
      if (selectedDate.getDay() == availableDate.getDay()) {
        //set end time
        let endTime = new Date(availableDate);
        endTime.setHours(endTime.getHours() + 1);
        this.availableTimeSlots[j].endTime = endTime.getTime() + "";
        this.filteredTimeSlots.push(this.availableTimeSlots[j]);
      }
    }

  }
  onCourseSelect(selected) {
    this.filteredTimeSlots = [];
    this.availableTimeSlots = [];
    this.user.suitableDate = undefined;
    this.user.suitableTimeSlot = undefined;
    this.dateFilter = (date: Date): boolean => {
      return false;
    }
    for (let i = 0; i < this.coursesFromServer.length; i++) {
      let courseFromServer: Course = this.coursesFromServer[i];

      if (courseFromServer.course_name == selected.value) {
        courseFromServer.slots.sort((a, b) => new Date(b.slot).getTime() - new Date(a.slot).getTime());
        this.availableTimeSlots = courseFromServer.slots;

        this.dateFilter = (date: Date): boolean => {
          for (let j = 0; j < courseFromServer.slots.length; j++) {
            let availableDate = new Date(Number(courseFromServer.slots[j].slot));
            if (date.getDate() == availableDate.getDate() && date.getTime() >= this.minDate.getTime() && date.getTime() <= this.maxDate.getTime()) {
              return true;
            }
          }
          return false;
        };
        break;
      }

    }
  }
}
