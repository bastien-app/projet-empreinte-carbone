import { Component } from '@angular/core';
import {CarbonFootprintFormComponent} from '../carbon-footprint-form/carbon-footprint-form.component';
import {CarbonFootprintResultComponent} from '../carbon-footprint-result/carbon-footprint-result.component';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {CarbonFootprintComputeService} from '../../services/carbon-footprint-compute.service';
import { Voyage } from '../../models/voyage'
import {ResumeVoyage} from '../../models/resume-voyage';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent, NgClass, DecimalPipe, DatePipe],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {

  voyages: Voyage[] = [];
  chargement:boolean = true;
  totalDist: number = 0;
  totalConso: number = 0;
  quantiteCO2Totale: number = 0;

  constructor(private computeService: CarbonFootprintComputeService) {}

  protected async getResumeData(){
    let data:ResumeVoyage = await this.computeService.getResumeVoyages();
    this.totalDist= data['totalDist'];
    this.totalConso= data['totalConso'];
    this.quantiteCO2Totale = data['totalQuantiteCO2'];
  }



  async ngOnInit() {
    try {
      this.voyages = await this.computeService.getVoyages();
      await this.getResumeData();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.chargement = false;
    }


  }

  protected async genererVoyage(){
    let distance: number = Math.floor(Math.random() * 1000);
    let conso: number = Math.floor(Math.random() * 25);
    await this.computeService.addVoyage({vehicule:"voiture", distanceKm: distance, consommationPour100Km: conso, date: new Date()});
    await this.getResumeData();

}






  protected addDistance() {
    this.totalDist = this.totalDist + 100;
  }


}
