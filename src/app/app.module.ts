import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AngularFireModule} from 'angularfire2';
//import * as firebase from 'firebase';

import { AppComponent } from './app.component';
const config = {
  apiKey: "AIzaSyCHeN-Y9QA6dKHP9mYPF93yHXFDL-4o4nU",
  authDomain: "to-do-mat2.firebaseapp.com",
  databaseURL: "https://to-do-mat2.firebaseio.com/",
  storageBucket: "to-do-mat2.appspot.com"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
