import { Component } from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';

import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink, RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public router: Router, public service: UserService) { }

}
