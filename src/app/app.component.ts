import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'notch-up';
  constructor(private ngxFavicon: AngularFaviconService) {}
 
  ngOnInit() {
   
    this.ngxFavicon.setFavicon("../assets/blue.png");
  }
}
