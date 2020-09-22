import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { Subscription } from 'rxjs';
import { JobService } from '../job.service';
import { Pagination } from '../../shared/pagination';

@Component({
  selector: 'app-job-show',
  templateUrl: './job-show.component.html',
  styleUrls: ['./job-show.component.css']
})
export class JobShowComponent implements OnInit {
  jobs: Job[] = [];
  subscriptions: Subscription[] =[];
  pageNum = 1;
  pageSize = 6;
  pagination: Pagination;

  constructor(
    private jobServ: JobService
  ) { }

  ngOnInit() {
    this.showMore();
    this.subscriptions.push(
      this.jobServ.jobChanged.subscribe(()=>{
        this.pageNum = 1;
        this.jobs = [];
        this.showMore();
      })
    );
  }

  getActiveJobs(){
    this.jobServ.fetchJobsByType(this.pageNum, this.pageSize)
    .subscribe(jobs => {
      this.pageNum++
      this.pagination = jobs.pagination;
      jobs.result.forEach((job)=>{
        this.jobs.push(job);
      })
    });
  }

  getAllJobs(){
    this.jobServ.fetchAllJobsByType(this.pageNum, this.pageSize)
    .subscribe(jobs => {
      this.pageNum++
      this.pagination = jobs.pagination;
      jobs.result.forEach((job)=>{
        this.jobs.push(job);
      })
    });
  }

  showMore(){
    if (this.jobServ.onlyActive == true){
      this.getActiveJobs();
    } else {
      this.getAllJobs();
    }
  }

  ngOnDestroy(){
    this.jobs = [];
    this.subscriptions.forEach(
      (sub)=>{
        sub.unsubscribe();
      }
    );
  }

}
