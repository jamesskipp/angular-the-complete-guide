import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestAPIConstants } from '../shared/utils/rest-api.constants';
import { Observable } from 'rxjs';
import { WebAppEvent } from './WebAppEvent';
import { environment } from 'src/environments/environment';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../auth/models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private events: WebAppEvent[] = [];
  private user: User;

  readonly RECIPEBOOK = RestAPIConstants.URL_RECIPEBOOK_API;
  readonly BATCH_PERIOD = 5 * 1000; // 5s
  readonly BATCH_SIZE = 50;

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
    // Batch Post every minute
    setInterval(() => {
      this.processEvents();
    }, this.BATCH_PERIOD);

    // Batch Post on exiting application
    window.addEventListener('beforeunload', () => {
      this.processEvents(false);
    });

    this.store.select('auth').subscribe((authState) => {
      this.user = authState.user;
      console.log(authState);
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
      environment.urls.logging.base + this.RECIPEBOOK.EVENT,
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

  addEvent(event: {
    action: string;
    label: string;
    component: {
      name: string;
      parentName: string;
      innerText: string;
      innerHTML: string;
      styles: object;
    };
    data: object;
  }): void {
    this.events.push({
      ...event,
      time: Date.now(),
      user: this.user,
      sessionToken: this.user && this.user.token,
      page: {
        url: this.router.url,
        location: window.location.href,
      },
    });
  }
}
