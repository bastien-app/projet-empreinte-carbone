import {Component, OnDestroy, OnInit} from '@angular/core';
import {Voyage} from '../../models/voyage';
import {Subject, takeUntil} from 'rxjs';
import {CarbonFootprintComputeService} from '../../services/carbon-footprint-compute.service';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-carbon-footprint-result',
  imports: [
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './carbon-footprint-result.component.html',
  styleUrl: './carbon-footprint-result.component.css'
})
export class CarbonFootprintResultComponent implements OnInit, OnDestroy {
  voyages: Voyage[] = [];
  chargement = true;

  private destroy$ = new Subject<void>();

  constructor(private computeService: CarbonFootprintComputeService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.voyages = await this.computeService.getVoyages();
    } catch (error) {
      console.error(error);
    } finally {
      this.chargement = false;
    }

    this.computeService.voyageObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe(voyage => {
        this.voyages = [...this.voyages, voyage];
      });
  }

  protected async genererVoyage(){
    let distance: number = Math.floor(Math.random() * 1000);
    let conso: number = Math.floor(Math.random() * 25);
    await this.computeService.addVoyage({vehicule:"voiture", distanceKm: distance, consommationPour100Km: conso, date: new Date()});


  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}



