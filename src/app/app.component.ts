import { Component, signal, inject, computed } from '@angular/core';
import { OnInit } from '@angular/core';
import { JobListComponent } from './component/job-list/job-list.component';
import { JobDetails } from './model/jobdetails.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [JobListComponent]
})
export class AppComponent implements OnInit{
  title = 'ADPinterview';

  jobsIds: Number[] = [];
  pageSize: number = 6;
  pageNumber = signal(1);
  startIndex = signal(0);
  pgNum = computed(() => this.pageNumber());
  stIdx = computed(() => this.startIndex());
  fetchedJobIds: Number[] = [];
  jobs:JobDetails[] = [];
 

  ngOnInit() {
    
  }

  loadMore(){
    this.pageNumber.set(this.pageNumber()+1);
    this.startIndex.set(this.startIndex()+this.pageSize);
  }
}




