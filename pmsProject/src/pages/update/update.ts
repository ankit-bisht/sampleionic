import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LogoutPage } from '../../pages/logout/logout';
import { RestfullProvider } from '../../providers/restfull/restfull';
import { DataExchange } from '../../providers/dataexchange/dataexchange';
 import { FillformPage } from '../fillform/fillform';
 import { ModalController, LoadingController } from 'ionic-angular';
 import { Events } from 'ionic-angular';




@Component({
  selector: 'update-tabs',
  templateUrl: 'update.html',
})
export class UpdatePage {
    toggle: boolean;
public result;
loader;
  constructor(public event: Events, public loadingCtrl: LoadingController,public modalCtrl : ModalController,public navCtrl: NavController, public navParams: NavParams , public rest :RestfullProvider , public dataex : DataExchange) {
    event.subscribe("data",res=>{console.log("event");this.getUpdate()})  
  }

items: Array<{date : string, hours : number, body : string, bill : boolean, id : number}>;
fun(res){
  this.result = res;
  this.items = [];
    console.log(this.result, "this is result")
  for(var i=this.result.result.length-1; i>=0;i--){
    if(this.result.result[i].integer_field_2 == 1){
      this.toggle = true;
    }
    else this.toggle = false;
this.items.push({
  date : this.result.result[i].date_field_1,
  hours : this.result.result[i].float_field_1,
  body : this.result.result[i].body,
  bill : this.toggle,
  id : this.result.result[i].id
})
  console.log(this.result.result[i], "this is resulasdadt")
  }
  console.log(this.items , "this is tems");
  console.log(this.result, "this is result")
}

putdata(des, hours, bill, date, id)
{
  if(bill == true)
  bill = 1;
  else
  bill = 0;
  var dataobj = {
    "des": des,
    "hours" : hours,
    "bill" : bill,
    "update" : true,
    "date": date,
    "id" : id
  }
  console.log(dataobj, "this is dataobj")
  this.dataex.setData(dataobj);

let myModal = this.modalCtrl.create(FillformPage);
    myModal.present();


}
  ngOnInit() {
//        if(this.dataex.noOfDays() > 14)
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
        
this.getUpdate();
}

  getUpdate(){
    this.rest.gettimesheetdata().subscribe(res=>{this.fun(res);    this.loader.dismiss();
  });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
