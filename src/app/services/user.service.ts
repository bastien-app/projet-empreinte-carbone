import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:string = "";
  password: string = "";
  constructor() { }


  login(username: string, password: string) {
    this.user = username;
    this.password = password;
  }

  getUsername(){
    if(this.user){
      return this.user;
    }
    else{
      return '';
    }
  }
}
