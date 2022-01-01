import { ObserversModule } from '@angular/cdk/observers';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
      // const interval$ = interval(1000);

      // interval$.subscribe(val => console.log(val));

      // const click$ = fromEvent(document, 'click');

      // click$.subscribe(evt => console.log(evt));

      const http$ = new Observable(httpSubscriber => {
        fetch('/api/courses')
          .then(response => {
            if (response.ok) {
              return response.json();
            }

            httpSubscriber.error('Request failed with status code: ' + response.status);
          })
          .then(data => {
            httpSubscriber.next(data);
            httpSubscriber.complete();
          })
          .catch(ex => {
            httpSubscriber.error(ex);
          })
      });

      http$.subscribe(
        courses => console.log(courses),
        noop,
        () => console.log('http request completed'),
      );
    }


}






