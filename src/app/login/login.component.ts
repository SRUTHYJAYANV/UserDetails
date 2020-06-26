import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../common/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public userDetails: any;
  public error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.getUserDetails();
  }

  //creating a form
  public buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // get all the user details from the api
  public getUserDetails() {
    this.httpClient.get('https://randomuser.me/api/0.8/?results=20').subscribe((data) => {
      this.userDetails = JSON.stringify(data);
      localStorage.setItem('userDetails', this.userDetails);
    })
  }

  //on the submit of the form
  onSubmit(event: NgForm) {
    if (this.loginForm.invalid) {
      return;
    }
    let result = this.authenticationService.login(event.value.username, event.value.password);
    if (result) {
      this.error = ''
      this.router.navigate(['/home']);
    }
    else {
      this.error = "User not found"
    }
  }
}

