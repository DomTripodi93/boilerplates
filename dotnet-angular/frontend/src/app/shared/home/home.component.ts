import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/job/job.service';
import { MachineService } from 'src/app/machine/machine.service';
import { Machine } from 'src/app/machine/machine.model';
import { Job } from 'src/app/job/job.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lathes: Machine[] = [];
  mills: Machine[] = [];
  currentLatheJobs: string[] = [];
  unusedLatheJobs: Job[] = [];
  currentMillJobs: Job[] = [];
  unusedMillJobs: Job[] = [];

  constructor(
    private jobServ: JobService,
    private machServ: MachineService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    if (this.auth.user){
      this.getMachines("mill");
      this.getMachines("lathe");
    }
  }

  getMachines(type: string){
    this.machServ.fetchMachinesByType(type).subscribe(machines => {
      if (machines.length > 0){
        if (type == "lathe"){
          this.lathes = machines;
          machines.forEach(mach=>{
            if (mach.currentJob != "None"){
              this.currentLatheJobs.push(mach.currentJob);
            }
          })
        } else {
          this.mills = machines;
        }
        this.checkJobs(type);
      }
    })
  }
  //Sets values for machines based on type and calls function for job setting by type

  checkJobs(type: string){
    this.jobServ.fetchJobsByType(1, 6, type)
      .subscribe(jobs => {
        if (jobs.result.length > 0){
          this.getJobs(type);
        } else {
          return false;
        }
      }
    )
  }


  getJobs(type: string){
    this.jobServ.fetchJobsByType(1, 20, type).subscribe(jobs => {
      jobs.result.forEach(job=>{
        if (type == "mill"){
          if (job.remainingQuantity != job.orderQuantity){
            this.currentMillJobs.push(job);
          } else {
            this.unusedMillJobs.push(job);
          }
        } else {
          if (!this.currentLatheJobs.includes(job.jobNumber)){
            this.unusedLatheJobs.push(job);
          }
        }
      })
    })
  }
  //Sets values for jobs by type

}
