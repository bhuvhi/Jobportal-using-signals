import { Component, effect, inject, input, OnInit, signal, Signal } from '@angular/core';
import { JobsServiceService } from '../../service/jobs/jobs-service.service';
import { JobDetails } from '../../model/jobdetails.model';
import { JobDetailsComponent } from '../jobdetails/jobdetails.component';

@Component({
  selector: 'app-job-list',
  imports: [JobDetailsComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  jobsService = inject(JobsServiceService);

  jobIds:number[] = [];
  fetchedJobIds: Number[] = [];
  pageSize: number = 6;
  pageNumber = input<number>(1);
  startIndex = input<number>(0);

  jobs = signal<JobDetails[]>([]);

  constructor() {
    effect(() => {
      this.loadDetails();
    })
  }

  ngOnInit(){
    this.jobsService.getJobIds().subscribe((response: number[]) => {
      this.jobIds = response;
      this.loadDetails();
    }, (error:any) => {
      console.log("error fetching job ids", error)
    });
    
  }

  loadDetails(){
    this.fetchedJobIds = this.jobIds?.slice(this.startIndex(), (this.pageSize * this.pageNumber()));
    this.jobsService.getJobDetails(this.fetchedJobIds).subscribe((response:any) => {
      this.jobs.set([...this.jobs(), response]);
    }, (error:any) => {
      console.log("error fetching job details", error)
    });
    
  }
}
