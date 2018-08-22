import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { IgxGridModule } from 'igniteui-angular/main';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IgxGridModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
