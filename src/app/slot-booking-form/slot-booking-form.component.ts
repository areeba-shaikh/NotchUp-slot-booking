import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Course } from '../course';
import { CourseService } from '../course.service';


import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { Slot } from '../slot';

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
  dateFilter = (date: Date): boolean => { return true; }
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
  constructor(private courseService: CourseService) {
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

  }
  getCourses() {
    this.courseService.getCourses()
      .subscribe((data: Course[]) => {

        this.coursesFromServer = data;
      });
  }
  onDateSelect(selected) {
    let selectedDate = new Date(selected.value);
    console.log(selectedDate);
    console.log(this.availableTimeSlots);
    this.filteredTimeSlots = [];
    for (let j = 0; j < this.availableTimeSlots.length; j++) {
      let availableDate = new Date(Number(this.availableTimeSlots[j].slot));
      if (selectedDate.getDay() == availableDate.getDay()) {
        this.filteredTimeSlots.push(this.availableTimeSlots[j]);
      }
    }
    
  }
  onCourseSelect(selected) {
    console.log(selected.value);
    this.availableTimeSlots = [];
    this.user.suitableDate = "";
    this.dateFilter = (date: Date): boolean => {
      return false;
    }
    for (let i = 0; i < this.coursesFromServer.length; i++) {
      let courseFromServer: Course = this.coursesFromServer[i];


      //set end time
      // for (let j = 0; j < courseFromServer.slots.length; j++) {
      //   courseFromServer.slots[j].endTime = courseFromServer.slots[j].slot;
      //       let endTime = new Date(Number(courseFromServer.slots[j].endTime));
      //       endTime.setHours(endTime.getHours() + 1);
      //       courseFromServer.slots[j].endTime = "" + endTime.getSeconds();
      //       console.log(courseFromServer.slots[j]);
      //       console.log(endTime);
      // }
      // this.coursesFromServer[i] = courseFromServer;

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
