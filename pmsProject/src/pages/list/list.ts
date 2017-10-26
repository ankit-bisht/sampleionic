import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AllmissingdatesPage } from '../../pages/allmissingdates/allmissingdates';
import { RestfullProvider } from '../../providers/restfull/restfull';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { DataExchange } from '../../providers/dataexchange/dataexchange';
 import { ModalController } from 'ionic-angular';
 import { FillformPage } from '../fillform/fillform';
 import { LogoutPage } from '../../pages/logout/logout';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string}>;
  item:any;
  projects;
  loader;
  // month = {
  //   month : '05'
  // }
  
  constructor(public modalCtrl : ModalController,public dataex : DataExchange, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private view: ViewController , public pro: RestfullProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

  }









 

  ngOnInit() {

//         if(this.dataex.noOfDays() > 14)
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
      this.getprojects();
      // this.month.month = '02';
      // console.log(this.month);
  }


    getprojects(){
  
        this.pro.getprojects(localStorage.getItem('userId')).subscribe(res=>{
          console.log(res)
        localStorage.setItem("Projects" , JSON.stringify(res.result)); 
        this.viewlist();
        });
  
      
    
  console.log(this.items);
}

viewlist(){
  this.projects = localStorage.getItem("Projects");
  console.log(this.projects);
  this.projects = JSON.parse(this.projects);
  console.log(this.projects);
this.items = [];
        for (let i = 0; i < this.projects.length; i++) {
      this.items.push({
        title: this.projects[i].project,
        note:  this.projects[i].project_id,
      });
    }
    this.loader.dismiss();
}

    
  itemTapped(project_name, project_id) {
    // That's right, we're pushing to ourselves!
    let selectedProject = {
      "project_name" : project_name,
      "project_id" : project_id
    }
    console.log(selectedProject , "   this is selected project in list")
    // this.month.month = month.month;
this.dataex.setData(selectedProject);
let myModal = this.modalCtrl.create(FillformPage);
    myModal.present();
  }
}
