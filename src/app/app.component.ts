import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './composants/header/header.component';
import {FooterComponent} from './composants/footer/footer.component';
import {CarbonFootprintComponent} from './composants/carbon-footprint/carbon-footprint.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CarbonFootprintComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet-empreinte-carbone';
}
