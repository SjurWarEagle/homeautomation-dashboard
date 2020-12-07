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
      this.background = 'red';
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
