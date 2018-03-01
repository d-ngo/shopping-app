import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAKTv9VgtEiaoaMrG5XeL_ZDsMH0ZJcIXw",
      authDomain: "dngo-shopping-app.firebaseapp.com"
    });

    this.authService.checkTokenInStorage();
  }
}
