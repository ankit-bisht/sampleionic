import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { ViewController, } from 'ionic-angular'; 
 import { DataExchange } from '../../providers/dataexchange/dataexchange';
 import { RestfullProvider } from '../../providers/restfull/restfull';
import { LogoutPage } from '../../pages/logout/logout';
import { Events } from 'ionic-angular';


/**
 * Generated class for the FillformPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-fillform',
  templateUrl: 'fillform.html',
})
export class FillformPage {

  constructor(public event : Events, public rest : RestfullProvider,  public dataex : DataExchange,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public fb : FormBuilder) {
  }
public form12:FormGroup;
date;
items: Array<{project : string, projectid : number}>;

  



dataobj = null;
 ngOnInit() {

this.dataobj = this.dataex.getData();
//      if(this.dataex.noOfDays() > 14)
// {
//    this.navCtrl.push(LogoutPage).then(() => {
//             const index = this.navCtrl.getActive().index;
//             this.navCtrl.remove(0, index);
//           });
// }
  
          this.form12 = this.fb.group({
          hours: [this.dataobj.hours || 8,[Validators.required]],
          summary: [this.dataobj.des || null,[Validators.required]],
          billable: [this.dataobj.bill || 1],
          project : [null]
        });
 
        this.date = localStorage.getItem("date");
        console.log(this.dataex.getData());

        if(this.dataobj.update){
          this.rest.getprojects(localStorage.getItem('userId')).subscribe(res=>{this.getprojects(res); console.log(res, "original res")})
        }
}
getprojects(res){
  console.log(res);
  this.items = [];
  for(var i = 0 ; i < res.result.length; i++){
this.items.push({
  project: res.result[i].project,
  projectid : res.result[i].project_id
})
  }
  console.log(this.items , "items");
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PmsPage');
  }
    cancel() {
    this.viewCtrl.dismiss();
  }



 





 OnFormSubmit(form12) {
   console.log(form12)
   if(!this.dataobj.update){
   
   this.rest.inserttimesheet(form12.summary, form12.hours, form12.billable).subscribe(res=>{console.log(res);this.cancel();this.event.publish('data',res)});

   }else
this.rest.puttimesheet(form12.summary, form12.hours, form12.billable, form12.project, this.dataobj.date, this.dataobj.id).subscribe(res=>{console.log(res);this.cancel();this.event.publish('data',res)}); 
}

}
