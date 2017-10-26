import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { UpdatePage } from '../../pages/update/update';
import { AllmissingdatesPage } from '../../pages/allmissingdates/allmissingdates';
import { DataExchange } from '../../providers/dataexchange/dataexchange';
import { LogoutPage } from '../../pages/logout/logout';


/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {

tab1Root = AllmissingdatesPage;
  tab2Root = UpdatePage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataex : DataExchange) {
  }
ngOnInit() {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
//    if(this.dataex.noOfDays() > 14)
// {
//    this.navCtrl.push(LogoutPage).then(() => {
//             const index = this.navCtrl.getActive().index;
//             this.navCtrl.remove(0, index);
//           });
// }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
