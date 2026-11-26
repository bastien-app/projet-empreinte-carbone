import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  user:string = "";
  password: string = "";
  constructor(private http: HttpClient) { }
  statut?: string;
  private _utilisateurID: string | null = null;


  register(user:string, password:string) {
    this.http.post<{ message: string; utilisateurID: string }>('http://localhost:8080/enregistrerUtilisateur', {login:user, password:password})
    .subscribe(
      {
        next: reponse => {
          this._utilisateurID = reponse.utilisateurID;
          this.statut = reponse.message
        },
        error: error => {
          this._utilisateurID = null;
          this.statut = error.error?.message;
        },
      }
    );

  }

  get utilisateurID(): string | null {
    return this._utilisateurID;
  }

  login(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post<{ message: string; utilisateurID: string }>(
        'http://localhost:8080/connexionUtilisateur',
        { login: username, password }
      ).subscribe({
        next: reponse => {
          this.statut = reponse.message;
          this._utilisateurID = reponse.utilisateurID;
          this.user = username;
          resolve(reponse.message);
        },
        error: erreur => {
          this.statut = erreur.error?.message;
          reject(erreur);
        }
      });
    });
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
