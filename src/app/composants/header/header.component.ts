import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public service: UserService, public router: Router) { }

  nomUtilisateur: string = "";
  async ngOnInit() {
    this.nomUtilisateur = await this.service.getUsername()
  }


  protected logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    this.router.navigate(['']);
  }
}
