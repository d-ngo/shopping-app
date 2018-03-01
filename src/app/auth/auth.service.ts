import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  private token: string;
  private userEmail: string;

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error)
      });
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.router.navigate(['/']);
        this.userEmail = firebase.auth().currentUser.email;
        return firebase.auth().currentUser.getIdToken();
      })
      .then((token: string) => {
        this.token = token;
      })
      .catch((error) => {
        console.log(error)
      }
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        this.token = token;
      });
    return this.token;
  }

  getUser() {
    if (this.userEmail) {
      const username = this.userEmail.substring(0, this.userEmail.indexOf('@'));
      return username;
    }
  }

  isAuthenticated() {
    return this.token != null;
  }

  checkTokenInStorage() {
    const tokenKey = Object.keys(window.localStorage)
      .filter(
        (it : string) => {
          return it.startsWith('firebase:authUser')
        }
      )[0];
    if(tokenKey) {
      this.token = JSON.parse(localStorage.getItem(tokenKey)).stsTokenManager.accessToken;
      this.userEmail = JSON.parse(localStorage.getItem(tokenKey)).email;
    }
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.userEmail = null;
    this.router.navigate(['/']);
  }
}
