import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {

   private events = [];

   addEvent(event) {
      console.debug(event);
      this.events.push(event);
   }
}