import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import _ from 'lodash';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { DaysService } from 'src/app/shared/days/days.service';

@Component({
  selector: 'app-hourly-find',
  templateUrl: './hourly-find.component.html',
  styleUrls: ['./hourly-find.component.css']
})
export class HourlyFindComponent implements OnInit, OnDestroy{
  @ViewChild('newMonth', {static:false}) newMonthForm: NgForm;
  date = new Date();
  today = this.date.getDate();
  month = this.date.getMonth();
  monthHold = ""+(this.month+1);
  year = this.date.getFullYear();
  day = this.date.getDay();
  defaultMonth = ""; 
  oldMonth: number = this.month;
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  numberOfDays: number;
  monthDays = []
  firstDayOfMonth = []
  firstDay: Date;
  welcome = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    public dayServ: DaysService
  ) { }

  ngOnInit() {
    this.setDate()
  }

  setDate(){
    if (this.month < 9){
      this.monthHold ="0"+this.monthHold;
    }
    this.defaultMonth = this.year + "-" + this.monthHold;
    this.daysInMonth(this.year, this.month+1);
    this.monthDays = _.range(1, this.numberOfDays + 1);
    this.firstDay = new Date(this.year, this.month, 1);
    this.firstDayOfMonth = _.range(0, this.firstDay.getDay());
    this.welcome = "Today is " + this.days[this.day] + " " + (this.month+1) + "-" + this.today + "-" + this.year;
  }

  daysInMonth(year: number, month: number){
    this.numberOfDays = new Date(year, month, 0).getDate();
  }

  changeDate(){
    let hold = this.newMonthForm.value.date.split("-");
    this.year = +hold[0];
    this.month = +hold[1] - 1;
    this.setDate();
  }

  onViewDate(arr){
    let path = "/"+arr.join("/")+"/hourly";
    this.router.navigate([path])
  }

  ngOnDestroy(){
    this.auth.showButton(1);
  }
}
