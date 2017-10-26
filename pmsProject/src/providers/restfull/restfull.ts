import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config }  from '../config/config';


/*
  Generated class for the RestfullProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestfullProvider {
  token;  
  constructor(public http: Http , public config : Config ) {
  this.token = localStorage.getItem('Token')
    
    console.log(this.token , "service token");
  }
checkusers(user): Observable<any> {
  var userobj = {
    "email":user.email,
    "password" : user.password
  }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(user);
    return this.http.post(this.config.checkurl, user, options).map((res: Response) => res.json());
  }

  getprojects(id):Observable<any>{
    var obj = {
      "id": id 
    }
    let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization' :' Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.config.projectsurl, obj, options).map((res: Response) => res.json());
  }

missingdates():Observable<any>{
  let userid = {
    "userid" : localStorage.getItem("userId")
  }
 let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization' :' Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.config.missing_dates , userid, options).map((res: Response) => res.json()); 
}



inserttimesheet(des, hours, bill):Observable<any>{
  
let projects = localStorage.getItem("Projects");
let p = JSON.parse(projects);
let date = localStorage.getItem("date");
date = date.substr(0,10);
console.log(date)
  let user = {
    "userid" : localStorage.getItem("userId"),
    "date" : date,
    "description" : des,
    "hours" : +hours,
    "billable" : bill,
    "projectid" : p[0].project_id,
    "name" : localStorage.getItem("name")
  }
  console.log(user);
 let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization' :' Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.config.inserttimesheet , user, options).map((res: Response) => res.json()); 
}


puttimesheet(des, hours, bill, projectid, date, id):Observable<any>{
  

  let user = {
    "userid" : +localStorage.getItem("userId"),
    "date" : date,
    "description" : des,
    "hours" : hours,
    "billable" : bill,
    "projectid" : +projectid,
    "name" : localStorage.getItem("name"),
    "id" : id
  }
  console.log(user);
 let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization' :' Bearer ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.config.puttimesheetdata , user, options).map((res: Response) => res.json()); 
}



gettimesheetdata():Observable<any>{
  
let id ={
  "userid" : +localStorage.getItem("userId")
}
 let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization' :' Bearer ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.config.gettimesheetdata , id, options).map((res: Response) => res.json()); 
}


}
