import { Injectable } from '@angular/core';
import {ResumeVoyage} from '../models/resume-voyage';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Voyage} from '../models/voyage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private voyages: { vehicule:string ; distanceKm: number; consommationPour100Km: number; quantiteCO2: number; date:Date}[] = [];

  private voyageSubject = new Subject<Voyage>();

  voyageObservable = this.voyageSubject.asObservable();

  constructor(private http: HttpClient, private service: UserService) { }

  async getVoyages(): Promise<Voyage[]> {
    return new Promise<Voyage[]>((resolve, reject) => {

        const userID = this.service.utilisateurID;
        if (!userID) {
          resolve([]);
          return;
        }
        const url = `http://localhost:8080/listerVoyages?utilisateurID=${userID}`
        this.http.get<{ voyages: Voyage[] }>(url).subscribe(res => {
          this.voyages = res.voyages;
          resolve(this.voyages);
        },
          err => {
          console.log(err);
                        reject(err)
        }
        )

    });

  }

  async addVoyage(voyage:{ vehicule:string ; distanceKm: number; consommationPour100Km: number; date:Date}){
    let quantiteCO2:number = 0;
    if(voyage.vehicule === 'voiture'){
      quantiteCO2 = (voyage.distanceKm * voyage.consommationPour100Km) / 100 * 2.3
    }
    else if(voyage.vehicule === 'train'){
      quantiteCO2 = voyage.distanceKm * 0.03;
    }
    else if(voyage.vehicule === 'avion'){
      quantiteCO2 = voyage.distanceKm * 0.2;
    }
    const userID = this.service.utilisateurID;
    if (!userID) {
      return; // pas d'utilisateur connecté
    }
    const url = `http://localhost:8080/ajouterVoyage?utilisateurID=${userID}`
    return new Promise<void>((resolve, reject) => {
      this.http.post(url, {
        typeVoyage: voyage.vehicule,
        distanceKm: voyage.distanceKm,
        consommationPour100Km: voyage.consommationPour100Km,
        date: voyage.date.toISOString()
      }).subscribe({
        next: () => {
          this.voyageSubject.next({ ...voyage, quantiteCO2 })
          this.voyages.push({ ...voyage, quantiteCO2 });
          resolve();
        },
        error: err => reject(err)
      });
    });
  }


  async getResumeVoyages():Promise<ResumeVoyage>{

    return new Promise((resolve, reject) => {
      const userID = this.service.utilisateurID;
      if (!userID) {
        resolve({totalDist: 0, totalConso: 0, totalQuantiteCO2: 0}); // pas d'utilisateur connecté
      }
      const url = `http://localhost:8080/getResumeVoyages?utilisateurID=${userID}`

      this.http.get<{
        distanceKm: number | null;
        consommationPour100Km: number | null;
        quantiteCO2Totale: number | null;
      }>(url).subscribe(res => {
        let totalDist = res.distanceKm;
        let totalConso = res.consommationPour100Km;
        let totalQuantiteCO2 = res.quantiteCO2Totale;

        resolve({
          totalDist: totalDist ?? 0,
          totalConso: totalConso ?? 0,
          totalQuantiteCO2: totalQuantiteCO2 ?? 0
        });
      },
        err => {console.log(err)
          reject(err);
      });




    })


  }

}


