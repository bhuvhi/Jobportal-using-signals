import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatMap, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsServiceService {

  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  jobDetailsArray: any[] = [];

  getJobIds(){
    return this.httpClient.get<number[]>('https://hacker-news.firebaseio.com/v0/jobstories.json');
  }

  getJobDetails(ids:Number[]){
    return from(ids).pipe(
      concatMap(id => {
        let url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;  
        return this.httpClient.get(url);
      })
    );
  } 
}