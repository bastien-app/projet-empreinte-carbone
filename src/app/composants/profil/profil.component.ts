import { Component } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  nom: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let data = this.route.snapshot.paramMap.get('login');
    if(data){
      this.afficherNom(data);
    }

  }

  afficherNom(data:string){
    this.nom = data;
  }
}
