import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataExchange {

  constructor() {
    console.log(' data exchangeb Provider');
  }
  data;
  setData(data){
this.data = data;
console.log(this.data, "this is selected project");
  }
getData():any{
  return this.data;
}



 noOfDays(){
    let oneDay = 24*60*60*1000;
   let loggedDate = Date.parse(localStorage.getItem("Session"));
   let currentDate = new Date();
   let diffDays  = Math.round(Math.abs((loggedDate - currentDate.getTime())/(oneDay)));
   return diffDays ;
}
 


 setDataforupdate(data){
this.data = data;
console.log(this.data, "this is selected project");
  }
getDataforupdate():any{
  return this.data;
}






}
