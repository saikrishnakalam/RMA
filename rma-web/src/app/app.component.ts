import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Country } from "src/app/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RMA';
  constructor(private appService: AppService){

  }

  ngOnInit() {
    this.appService.getCountries().subscribe((countriesList: Country[]) => {
      localStorage.setItem("countriesList", JSON.stringify(countriesList));
    });
  }
}
