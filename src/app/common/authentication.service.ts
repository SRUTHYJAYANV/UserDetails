import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import  *  as  data  from  '../data.json';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public jsonData: any;

  constructor(private httpClient: HttpClient) {
    this.getJsonData();
  }
  getJsonData() {
    this.httpClient.get("assets/data.json").subscribe(data => {
      this.jsonData = data;
    })
  }
  login(username: string, password: string) {
    for (let i = 0; i < this.jsonData.length; i++) {
      if (this.jsonData[i].username === username && this.jsonData[i].password === password) {
        return(this.jsonData[i]);
      }
    }
  }
}