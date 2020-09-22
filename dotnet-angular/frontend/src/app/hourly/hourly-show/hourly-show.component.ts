import { Component, OnInit, OnDestroy } from '@angular/core';
import { DaysService } from '../../shared/days/days.service';
import { Hourly } from '../hourly.model';
import { Subscription } from 'rxjs';
import { HourlyService } from '../hourly.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MachineService } from 'src/app/machine/machine.service';
import { Machine } from 'src/app/machine/machine.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-hourly-show',
  templateUrl: './hourly-show.component.html',
  styleUrls: ['./hourly-show.component.css']
})
export class HourlyShowComponent implements OnInit, OnDestroy {
  hourly: Hourly[] = [];
  hourlyHold: Hourly[]=[];
  splitLots: Hourly[][]=[];
  lastMachine = "";
  subscriptions: Subscription[]=[];
  machines: Machine[] = [];
  jobNumber="";
  nothing = [];


  constructor(
    public hourServ: HourlyService,
    private dayServ: DaysService,
    private machServ: MachineService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.dayServ.resetDate();
    this.machServ.getJobs();
    this.getMachines();
    this.subscriptions.push(this.hourServ.hourlyChanged.subscribe(()=>{
      setTimeout(()=>{this.getMachines()},50)}
    ))
  }

  quickInput(index){
    this.hourServ.jobNumber = this.machines[index].currentJob;
    this.hourServ.opNumber = this.machines[index].currentOp;
    this.hourServ.machine = this.machines[index];
    this.hourServ.quick[index] = true;
  }
  //Activates Quick Input for specific machine by machine index, and 
  // passes base values for form to hourly service

  quickPlus(index){
    this.hourServ.isJob[index] = true
    this.quickInput(index);
  }
  //Activates form for changing current job and op on machine

  quickTimeEdit(index){
    this.hourServ.editMode[index] = true;
    this.hourServ.setTime[index] = true
    this.quickInput(index);
  }
  //Activates form for changeing start time for hourly counts on machine

  getMachines(){
    this.subscriptions.push(this.machServ.fetchMachinesByType('lathe')
    .subscribe(machines => {
      this.setDefaults(machines);
      this.machines = machines;
    }));
  }

  setDefaults(machines){
    this.hourServ.isJob = [];
    this.hourServ.setTime = [];
    this.hourServ.canSetTime = [];
    this.hourServ.quick = [];
    this.hourServ.editMode = [];
    for (let i in machines){
      this.hourServ.isJob.push(false);
      this.hourServ.setTime.push(false);
      this.hourServ.canSetTime.push(false);
      this.hourServ.quick.push(false);
      this.hourServ.editMode.push(false);
      this.hourServ.startTimes.push(this.auth.defaultStartTime)
    }
  }

  onCancel(i){
    this.hourServ.quick[i]=false;
  }
  //Cancels Quick Input for specific machine by machine index

  ngOnDestroy(){
    this.subscriptions.forEach((sub)=>{sub.unsubscribe()})
  }
  //Removes observable subscriptions

}