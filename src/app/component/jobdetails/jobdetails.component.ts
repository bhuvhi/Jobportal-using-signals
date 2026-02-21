import { Component, input, Input } from "@angular/core";
import { JobDetails } from "../../model/jobdetails.model";
import { DatePipe, CommonModule } from "@angular/common";

@Component({
    selector: 'app-job-card',
    templateUrl: './jobdetails.component.html',
    standalone: true,
    imports: [DatePipe, CommonModule]
})

export class JobDetailsComponent {
    jobDetails = input<JobDetails | null>(null);
    
}