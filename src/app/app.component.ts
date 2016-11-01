import { Component, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'app works!';
	percentage:number;
	imageuploaded="notSet";
	url:boolean=false;
  	interval;
  	storageref;
  	storage;
  	path;
  constructor(){
  	this.percentage=0;
  	let config = {
    apiKey: "AIzaSyCHeN-Y9QA6dKHP9mYPF93yHXFDL-4o4nU",
    authDomain: "to-do-mat2.firebaseapp.com",
    databaseURL: "https://to-do-mat2.firebaseio.com",
    storageBucket: "to-do-mat2.appspot.com"
  	};
  	firebase.initializeApp(config);
  	this.storage =firebase.storage().ref();
  }
  filebuttoni(event){
    this.imageuploaded="notSet";
  	let files = event.srcElement.files[0];
  	let uploader=document.getElementById("uploader");
  	this.path="images/"+files.name;
  	this.storageref=this.storage.child(this.path);
  	let task=this.storageref.put(files);
  	let imageuploaded;
  	let percentage;
  	let set=false;
  	task.on('state_changed',
  		function progress(snapshot){
  			percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
  		},
      this.chk()
  	);
  }
  chk(){
    this.interval=setInterval(()=>{
      if(this.imageuploaded=="notSet"){
        this.storageref=this.storage.child(this.path).getDownloadURL().then(url=>
          this.imageuploaded=url
    	  );
      }else{clearInterval(this.interval);}
    },500);
  }
}
