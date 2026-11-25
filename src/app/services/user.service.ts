import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:string = "";
  constructor() { }


  login(username: string){
    this.user = username;
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
