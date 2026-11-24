import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private voyages: {distanceKm: number; consommationPour100Km: number; quantiteCO2: number}[] = [
    { distanceKm: 50, consommationPour100Km: 5, quantiteCO2: 10},
    { distanceKm: 150, consommationPour100Km: 6, quantiteCO2: 6.5 },
    { distanceKm: 250, consommationPour100Km: 7, quantiteCO2: 7.5 },
    { distanceKm: 350, consommationPour100Km: 8, quantiteCO2: 5 },
    { distanceKm: 450, consommationPour100Km: 9, quantiteCO2: 8 }
  ]

  constructor() { }

  getVoyages(): { consommationPour100Km: number; distanceKm: number; quantiteCO2: number }[] {
    return this.voyages;
  }

  addVoyage(voyage:{ consommationPour100Km: number; distanceKm: number}){
    const quantiteCO2 = (voyage.distanceKm * voyage.consommationPour100Km) / 100 * 2.3
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
