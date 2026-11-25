import { Component } from '@angular/core';
import {CarbonFootprintFormComponent} from '../carbon-footprint-form/carbon-footprint-form.component';
import {CarbonFootprintResultComponent} from '../carbon-footprint-result/carbon-footprint-result.component';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {CarbonFootprintComputeService} from '../../services/carbon-footprint-compute.service';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent, NgClass, DecimalPipe, DatePipe],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {

  voyages: { vehicule:string ; distanceKm: number; consommationPour100Km: number; quantiteCO2: number; date:Date;}[] = [];

  totalDist: number = 0;
  totalConso: number = 0;
  quantiteCO2Totale: number = 0;

  constructor(private computeService: CarbonFootprintComputeService) {}

  protected getResumeData(){
    let data = this.computeService.getResumeVoyages();
    this.totalDist= data['totalDist'];
    this.totalConso= data['totalConso'];
    this.quantiteCO2Totale = data['totalQuantiteCO2'];
  }



  ngOnInit() {
    this.voyages = this.computeService.getVoyages();
    this.getResumeData();

  }

  protected genererVoyage(){
    let distance: number = Math.floor(Math.random() * 1000);
    let conso: number = Math.floor(Math.random() * 25);
    this.computeService.addVoyage({vehicule:"voiture", distanceKm: distance, consommationPour100Km: conso, date: new Date()});
    this.getResumeData();

}






  protected addDistance() {
    this.totalDist = this.totalDist + 100;
  }


}
