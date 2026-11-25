import { Component } from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';

import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink, RouterModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  error:string = "";

  constructor(public router: Router, public service: UserService) { }

  protected formulaireLogin: FormGroup = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });


  login() {
    let id = this.formulaireLogin.get("login")?.value;
    let mdp = this.formulaireLogin.get("password")?.value;


    if (id == null || id == "") {
      this.error =  'Il faut un identifiant';
    }
    else if (mdp == null || mdp == "") {
      this.error = 'Il faut un mot de passe';
    }
    else if (id.length < 3){
      this.error = 'Identifiant trop court';
    }
    else if (mdp.length < 6){
      this.error = 'Mot de passe trop court';
    }

    else{
      this.service.login(id,mdp);
      this.router.navigate(['summary']);
    }

  }

}
