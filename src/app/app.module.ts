import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '192.168.73.58',
  port: 9001,
  protocol: 'ws',
  path: '/mqtt',
};
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
