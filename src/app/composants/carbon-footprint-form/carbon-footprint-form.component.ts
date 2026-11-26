import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {CarbonFootprintComputeService} from '../../services/carbon-footprint-compute.service';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.css'
})
export class CarbonFootprintFormComponent {

  constructor(private service: CarbonFootprintComputeService){}
  protected formulaireVoyage: FormGroup = new FormGroup({
    vehicule: new FormControl(null, [Validators.required]),
    distance: new FormControl(null, [Validators.required, Validators.min(1)]),
    conso: new FormControl(),
    date: new FormControl(null, [Validators.required]),
  });

  onSelectType(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'voiture') {

      this.formulaireVoyage.get('conso')?.setValidators([Validators.required, Validators.min(1)]);
      this.formulaireVoyage.get('conso')?.updateValueAndValidity();
    } else {

      this.formulaireVoyage.get('conso')?.clearValidators();
      this.formulaireVoyage.get('conso')?.updateValueAndValidity();
    }
  }

  protected async ajoutVoyage() {
    const dateSaisie = this.formulaireVoyage.get('date')?.value;

    const voyage = {
      vehicule: this.formulaireVoyage.get('vehicule')?.value,
      consommationPour100Km: this.formulaireVoyage.get('conso')?.value,
      distanceKm: this.formulaireVoyage.get('distance')?.value,
      date: new Date(dateSaisie)
    };
    try {
      await this.service.addVoyage(voyage);
    }
    catch (error) { console.error(error); }

  }
}
