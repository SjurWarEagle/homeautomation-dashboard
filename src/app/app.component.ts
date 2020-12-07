import {Component, OnDestroy, ViewChild} from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';
import NoSleep from 'nosleep.js';

// tslint:disable-next-line
var noSleep = new NoSleep();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  @ViewChild('startButton')
  private startButton: any;

  private subscription: Subscription;
  public co2Value: number;
  public mainBackground = 'black';
  public background = 'gray';
  public started: boolean;

  constructor(private mqttService: MqttService) {
    this.subscription = this.mqttService.observe('home/livingroom/co2/value').subscribe((message: IMqttMessage) => {
      // this.message = message.payload.toString();
      // console.log('message', this.message);
      this.co2Value = +message.payload.toString();
      console.log('this.co2Value', this.co2Value);
      if (this.co2Value < 500) {
        this.mainBackground = 'darkgray';
        this.background = 'transparent';
      } else if (this.co2Value < 700) {
        this.mainBackground = 'gray';
        this.background = 'gray';
      } else if (this.co2Value < 1000) {
        this.mainBackground = 'yellow';
        this.background = 'yellow';
      } else {
        this.mainBackground = 'red';
        this.background = 'red';
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public start(): void {
    noSleep.enable();
    this.started = true;
    // go fullscreen, only active for chrome based
    this.startButton.nativeElement.webkitRequestFullscreen();
  }
}
