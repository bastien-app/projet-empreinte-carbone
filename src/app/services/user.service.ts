import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:string = "";
  password: string = "";
  constructor() { }


  async login(username: string, password: string) {

      this.user = username;
      this.password = password;


  }

  async getUsername() {
    return new Promise<string>((resolve) => {
      if(this.user){
        resolve (this.user);
      }
      else{
        resolve ('');
      }
    })

  }
}
