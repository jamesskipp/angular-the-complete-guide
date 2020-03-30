import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestAPIConstants } from '../../rest-api.constants';
import { Observable } from 'rxjs';
import { WebAppEvent } from './WebAppEvent';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private events: WebAppEvent[] = [];

  readonly RECIPEBOOK = RestAPIConstants.URL_RECIPEBOOK_API;
  readonly BATCH_PERIOD = 60 * 1000;
  readonly BATCH_SIZE = 50;

  constructor(private http: HttpClient) {
    // Batch Post every minute
    setInterval(() => {
      this.processEvents();
    }, this.BATCH_PERIOD);

    // Batch Post on exiting application
    window.addEventListener('beforeunload', () => {
      this.processEvents(false);
    });
  }

  processEvents(batch = true) {
    if (this.events.length) {
      this.postEvents(batch);
    }
  }

  postEvents(batch = true): Observable<any> {
    let events: WebAppEvent[];
    if (batch) {
      events = this.events.splice(
        Math.max(0, this.events.length - this.BATCH_SIZE),
        this.BATCH_SIZE
      );
    } else {
      events = this.events;
    }

    console.debug(`Batching ${events.length} WebAppEvents...`);
    const postEvents$ = this.http.post(
      environment.baseUrl + this.RECIPEBOOK.EVENT,
      events
    );
    postEvents$.subscribe(
      (data) => {
        console.debug(`Successfully Batched ${events.length} WebAppEvents`);
      },
      (error) => {
        console.error(error);
        if (batch) {
          this.events.splice(this.events.length, 0, ...events);
        }
      }
    );
    return postEvents$;
  }

  addEvent(event: WebAppEvent): void {
    this.events.push(event);
  }
}
