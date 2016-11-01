import { Component, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable, AngularFireModule } from 'angularfire2';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
    reset:boolean=true;
    urlList:FirebaseListObservable<any[]>;
  constructor(public af:AngularFire){
    this.percentage=0;
    this.storage =firebase.storage().ref();
    this.urlList=af.database.list('/images').map((array) => array.reverse()) as FirebaseListObservable<any[]>;
  }
  filebuttoni(event){
    this.imageuploaded="notSet";
  	let files = event.srcElement.files[0];
  	let uploader=document.getElementById("uploader");
    let date= new Date();
  	this.path="images/"+files.name+"("+date+")";
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
      }else{
        this.urlList.push({"path":this.path, "image":this.imageuploaded});
        clearInterval(this.interval);
        this.resetFunction();
      }
    },500);
  }
  resetFunction(){
    this.reset=false;
    setTimeout(()=>{this.reset=true},0);
  }
  delete(path, key){
    this.urlList.remove(key);
    this.storage.child(path).delete();
  }
}
