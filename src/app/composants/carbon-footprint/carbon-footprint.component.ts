import { Component } from '@angular/core';
import {CarbonFootprintFormComponent} from '../carbon-footprint-form/carbon-footprint-form.component';
import {CarbonFootprintResultComponent} from '../carbon-footprint-result/carbon-footprint-result.component';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {CarbonFootprintComputeService} from '../../services/carbon-footprint-compute.service';

import {ResumeVoyage} from '../../models/resume-voyage';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent, NgClass, DecimalPipe,],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {


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

  ngOnInit(): void {
    void this.getResumeData();

    this.computeService.voyageObservable
      .subscribe(() => {
        void this.getResumeData();
      });
  }

  protected addDistance() {
    this.totalDist = this.totalDist + 100;
  }


}
