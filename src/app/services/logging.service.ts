import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestAPIConstants } from '../rest-api.constants';
import { Observable } from 'rxjs';
import { WebAppEvent } from '../models/WebAppEvent';

@Injectable({ providedIn: 'root' })
export class LoggingService {

   private events: WebAppEvent[] = [];

   readonly RECIPEBOOK = RestAPIConstants.URL_RECIPEBOOK_API;
   readonly BATCH_PERIOD = 60 * 1000;

   constructor(private http: HttpClient) {
      // Batch Post every minute
      setInterval(() => {
         this.processEvents();
      }, this.BATCH_PERIOD);

      // Batch Post on exiting application
      window.onbeforeunload = () => {
         this.processEvents();
         return true;
       };
   }

   processEvents() {
      if (this.events.length) {
         this.postEvents();
      }
   }

   addEvent(event) {
      this.events.push(event);
   }

   postEvents(): Observable<any> {
      console.debug(`Batching ${this.events.length} WebAppEvents...`);
      const postEvents$ = this.http.post(
         this.RECIPEBOOK.BASE + this.RECIPEBOOK.EVENT,
         this.events
      )
      postEvents$.subscribe((data) => {         
         console.debug(`Successfully Batched ${this.events.length} WebAppEvents`);
         this.events = [];
      }, (error) => {
         console.error(error);
      });
      return postEvents$;
   }
}