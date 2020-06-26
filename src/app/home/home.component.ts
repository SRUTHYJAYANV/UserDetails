import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public storedUserDetails: any;
  constructor() { }

  ngOnInit() {
    this.storedUserDetails = JSON.parse(localStorage.getItem('userDetails'))["results"];
  }

}
