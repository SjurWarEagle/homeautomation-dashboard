import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import {BikeData} from '../types/bike-data';
import NoSleep from 'nosleep.js';


// tslint:disable-next-line
var noSleep = new NoSleep();

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, OnInit {
  @ViewChild('startButton')
  private startButton: any;

  private readonly subscriptionCo2Value: Subscription;
  private readonly subscriptionBikeAll: Subscription;
  public co2Value: number;
  public bikeValues: BikeData;
  public mainBackground = 'black';
  public background = 'gray';
  public started: boolean;

  constructor(private mqttService: MqttService) {
    this.subscriptionCo2Value = this.mqttService
      .observe('home/livingroom/co2/value')
      .subscribe((message: IMqttMessage) => {
        // this.message = message.payload.toString();
        // console.log('message', this.message);
        this.co2Value = +message.payload.toString();
        this.updateColors();
      });
    this.subscriptionBikeAll = this.mqttService
      .observe('/home/livingroom/bike/all')
      .subscribe((message: IMqttMessage) => {
        this.bikeValues = JSON.parse(message.payload.toString()).data;
        // console.log(
        //   'bike message ',
        //   JSON.parse(message.payload.toString())
        // );

        this.updateColors();
      });
  }

  public ngOnInit(): void {
    this.updateColors();
  }

  private updateColors(): void {
    // console.log('this.co2Value', this.co2Value);
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
  }

  public ngOnDestroy(): void {
    if (this.subscriptionCo2Value) {
      this.subscriptionCo2Value.unsubscribe();
    }
    if (this.subscriptionBikeAll) {
      this.subscriptionBikeAll.unsubscribe();
    }
  }

  public showBikeValues(): boolean {
    return true;
    // return +this.bikeValues?.speed > 0 || +this.bikeValues?.distance > 0;
  }

  public start(): void {
    noSleep.enable();
    this.started = true;
    // go fullscreen, only active for chrome based
    this.startButton.nativeElement.webkitRequestFullscreen();
  }
}
