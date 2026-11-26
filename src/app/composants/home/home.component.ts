import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';

import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  error:string = "";

  registerStatut:string | undefined = "";
  loginStatut:string | undefined = "";

  constructor(public router: Router, public service: UserService) { }

  async ngOnInit() {
    this.loginStatut = "";
    const login = localStorage.getItem('login');
    const password = localStorage.getItem('password');
    if (login && password) {
      this.loginStatut = await this.service.login(login, password);

      if(this.loginStatut == 'Connexion réussie'){
        await this.router.navigate(['summary']);
        return;
      }
    }

  }

  protected formulaireLogin: FormGroup = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    remember: new FormControl(false)
  });



  async login() {
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

    else {
      const seSouvenir = this.formulaireLogin.get('remember')?.value === true;

      try {
        this.loginStatut = await this.service.login(id, mdp);

        if (this.loginStatut === 'Connexion réussie') {
          if (seSouvenir) {
            localStorage.setItem('login', id);
            localStorage.setItem('password', mdp);
          } else {
            localStorage.removeItem('login');
            localStorage.removeItem('password');
          }

          this.router.navigate(['/summary']);
        }
      } catch {
        this.loginStatut = this.service.statut ?? 'Erreur de connexion';
      }
    }

  }

  protected register() {
    let user = this.formulaireLogin.get("login")?.value;
    let mdp = this.formulaireLogin.get("password")?.value;
    this.service.register(user, mdp)
  }
}
