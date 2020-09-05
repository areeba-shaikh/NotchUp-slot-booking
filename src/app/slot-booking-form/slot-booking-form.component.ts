import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Course } from '../course';
import { CourseService } from '../course.service';


import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';

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
  avaialbleCourseNames = ['Game Development Jr', 
  'Game Development', 
  'App Development', 
  'Web Development',
  'Python Programming',
  'Artificial Intelligence'];
  minDate: Date;
  maxDate: Date;
  constructor(private courseService: CourseService) {
        // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
        const currentDate = new Date();
        this.minDate.setDate(currentDate.getDate() + 0);
        this.maxDate.setDate(currentDate.getDate() + 7);
   }

  ngOnInit(): void {
    this.user = {
      parentsName: "",
      parentsContactNumber: "",
      parentsEmailid: "",
      childsName: "",
      childsAge: 0,
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
        console.log(data)
      });
  }
}
