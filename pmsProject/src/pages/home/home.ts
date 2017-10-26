import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestfullProvider } from '../../providers/restfull/restfull';
import { AlertController } from 'ionic-angular';
import { AllmissingdatesPage } from '../../pages/allmissingdates/allmissingdates';
import { TabsPage } from '../../pages/tabs/tabs';
import { DataExchange } from '../../providers/dataexchange/dataexchange';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  type = 'password';
  show = false;
  loader;
  result;
  color = "black";
  public form1: FormGroup;

  constructor(public dataex: DataExchange, public menu: MenuController, public navCtrl: NavController, public rest: RestfullProvider, public alertCtrl: AlertController, public fb: FormBuilder) {


  }

  ionViewDidLoad() {
    this.menu.enable(false);
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }
  presentAlertNegative() {
    let alert = this.alertCtrl.create({
      title: 'Wrong!',
      subTitle: 'Email/Password is wrong',
      buttons: ['Ok']
    });
    alert.present();
  }








  OnFormSubmit(form2) {
    console.log(form2.value)

    this.rest.checkusers(form2.value).subscribe(res => {
      console.log(res); this.result = res;

      if (this.result.result.status == true) {
        // this.presentAlert();
        localStorage.setItem('Token', this.result.token);

        console.log(this.result.token, "result");
        localStorage.setItem('userId', this.result.result.result[0].id);
        localStorage.setItem('name', this.result.result.result[0].first_name + " " + this.result.result.result[0].last_name);
        if(form2.value.toggle == true){
          console.log(form2.value.toggle)
        localStorage.setItem("Session", Date());
        }
        this.navCtrl.push(TabsPage).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });

      }
      else {
        this.presentAlertNegative();
      }

    });
    // localStorage.removeItem("Projects");

  }


  ngOnInit() {
    // if(localStorage.getItem('userId')){
    //   this.navCtrl.push(AllmissingdatesPage).then(() => {
    //         const index = this.navCtrl.getActive().index;
    //         this.navCtrl.remove(0, index);
    //       });

    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.form1 = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(reg)]],
      password: ['', [Validators.required]],
      toggle: []

    });

    if (this.dataex.noOfDays() <= 14) {
      this.navCtrl.push(TabsPage).then(() => {
        const index = this.navCtrl.getActive().index;
        this.navCtrl.remove(0, index);
      });
    }

  }


  toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.type = "text";
      this.color = 'blue';
    }
    else {
      this.type = "password";
      this.color = 'black';
    }
  }

}