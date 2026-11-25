import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private voyages: { vehicule:string ; distanceKm: number; consommationPour100Km: number; quantiteCO2: number; date:Date}[] = [
    { vehicule:'voiture', distanceKm: 50, consommationPour100Km: 5, quantiteCO2: 10, date: new Date(2021, 0, 1)},
    { vehicule:'voiture', distanceKm: 150, consommationPour100Km: 6, quantiteCO2: 6.5, date: new Date(2021, 0, 1)},
    { vehicule:'voiture',distanceKm: 250, consommationPour100Km: 7, quantiteCO2: 7.5, date: new Date(2021, 0, 1) },
    { vehicule:'voiture',distanceKm: 350, consommationPour100Km: 8, quantiteCO2: 5, date: new Date(2021, 0, 1) },
    { vehicule:'voiture',distanceKm: 450, consommationPour100Km: 9, quantiteCO2: 8, date: new Date(2021, 0, 1) }
  ]

  constructor() { }

  getVoyages(): { vehicule:string ; distanceKm: number; consommationPour100Km: number; quantiteCO2: number; date:Date }[] {
    return this.voyages;
  }

  addVoyage(voyage:{ vehicule:string ; distanceKm: number; consommationPour100Km: number; date:Date}){
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

    this.voyages.push({...voyage, quantiteCO2});
  }


  getResumeVoyages(){

      let totalDist = 0;
      let totalConso = 0;
      let totalQuantiteCO2 = 0;
      this.voyages.forEach(voyage => {
        totalDist += voyage.distanceKm;
        totalConso += voyage.consommationPour100Km;
        totalQuantiteCO2 += voyage.quantiteCO2;
      })
      totalConso = totalConso/this.voyages.length;
      return {totalDist: totalDist, totalConso: totalConso, totalQuantiteCO2: totalQuantiteCO2};
  }

}
