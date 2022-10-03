import {
  Component,
  Injectable,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import hash from '../../../../hash.json';
import 'zone.js';

import PubSub from '../../../../../../node_modules/pubsub-js/src/pubsub.js';
const Channel = window['Channel'] as any;
let test = '';
@Component({
  selector: '#mf4',
  template: `<button (click)="logout()">logout</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Injectable()
export class AppComponent implements OnInit, OnChanges {
  constructor(private cd: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.title = test;
  }
  title = 'app';

  logout() {
    Channel.publish({ eventId: 'e4', id: 'mf4', message: 'logout' }, hash.hash);
  }
  subscribe() {
    console.log('subbing');
    console.log(Channel.getSubscriptions());
    PubSub.publish('MY TOPIC', 'hello from angular');
  }

  test(newtitle: string) {
    console.log('callingTest', newtitle);
    this.title = newtitle;
  }

  ngOnInit(): void {
    var token = PubSub.subscribe('MY TOPIC', (msg, data) => {
      console.log('da angular', msg, data);
    });
    Channel.subscribe(
      {
        id: 'mf4',
        callback: (data: string) => {
          console.log(this);
          this.test(data);
          test = data;
          console.log('from ng', data, test);
          this.cd.detectChanges();
        },
        eventId: 'e3',
      },
      hash.hash
    );
  }
}
