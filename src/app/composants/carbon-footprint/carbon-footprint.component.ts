import { Component } from '@angular/core';
import {CarbonFootprintFormComponent} from '../carbon-footprint-form/carbon-footprint-form.component';
import {CarbonFootprintResultComponent} from '../carbon-footprint-result/carbon-footprint-result.component';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {

  ngOnInit() {
    console.log('CarbonFootprintComponent initialized.');
  }

  ngAfterContentInit() {
    console.log('CarbonFootprintComponent content initialized.');
  }

  ngOnDestroy() {
    console.log('CarbonFootprintComponent destroyed.');
  }
}
