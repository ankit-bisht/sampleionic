import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataExchange } from '../../providers/dataexchange/dataexchange';
 import { DatePickerModule } from 'datepicker-ionic2';
 import { RestfullProvider } from '../../providers/restfull/restfull';
 import { LoadingController } from 'ionic-angular';
 import { AlertController } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';
import { Events } from 'ionic-angular';
import { LogoutPage } from '../../pages/logout/logout';

@Component({
  selector: 'page-allmissingdates',
  templateUrl: 'allmissingdates.html',
})


export class AllmissingdatesPage {
 
myDate : Date = new Date(Date.now());
  constructor(public event : Events ,public alertCtrl : AlertController, public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams , public dataex : DataExchange , public rest : RestfullProvider) {
event.subscribe("data",res=>{console.log("event");this.getdates()})  
}
  missingdates = []; 
  project;
  loader;
  items: Array<{title: string, ActualDate: string}>;
datessubscription;
  // opencal(){console.log("cal open")}
 
ngOnInit() {
//   if(this.dataex.noOfDays() > 14)
// {
//    this.navCtrl.push(LogoutPage).then(() => {
//             const index = this.navCtrl.getActive().index;
//             this.navCtrl.remove(0, index);
//           });
// }
  this.loader = this.loadingCtrl.create({
      content: "Please wait..."
  });
  

  this.loader.present();
  this.project = this.dataex.getData();
 this.getdates();


// this.opencal();
  
}


 presentAlertCheckInternet() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Check internet connection!!',
      buttons: ['Ok']
    });
    alert.present();
  }


getdates(){
   this.datessubscription = this.rest.missingdates().subscribe(res=>{console.log(res);
localStorage.setItem("MissingDates", JSON.stringify(res.result));
this.viewdates();  
},
error=>{
    this.loader.dismiss();
this.presentAlertCheckInternet();  

} );
}
// refreshdates(){
// if(this.datessubscription != null){
//   this.datessubscription.unsubscribe();
// }
// this.datessubscription = this.rest.missingdates().subscribe(res=>{console.log(res);
// localStorage.setItem("MissingDates", JSON.stringify(res.result));
// this.viewdates()
// } );

// }
viewdates(){
  this.missingdates = JSON.parse(localStorage.getItem("MissingDates"));
 
  console.log(this.missingdates , "these are the mising dates");
  this.items = [];
  let days = [];
        for (let i = this.missingdates.length -1; i >= 0; i--) {
        days[i] = new Date(this.missingdates[i])
        
        console.log(days[i] , "up");
        //   days[i] = days[i].substr(0,5);
        // console.log(days[i] , " down");
          
      this.items.push({
        title: days[i],
        ActualDate : this.missingdates[i]
      });
    }
    this.loader.dismiss();
}


itemTapped(date){
    
     this.navCtrl.push(ListPage);
     
    localStorage.setItem("date", date);
    this.dataex.setData(date);

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectselectedPage');
  }

}
