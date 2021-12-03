import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Province     } from '../../models/taxes.model';
import { TaxesService } from '../../services/taxes.service';

@Component({
  selector: 'app-provinces-view-v1',
  styles: [],
  template: `
    <div class="card">
      <div class="card-header">Provinces</div>
      <div id="provinces-list" class="list-group list-group-flush">
        <a *ngFor="let province of provinces"
           [routerLink]="'/v1/provinces/' + province.code" 
           class="list-group-item list-group-item-action province-item">
          {{ province.province }}
        </a>
      </div>
    </div>
  `
})
export class ProvincesViewComponent_V1 implements OnInit {

  provinces: Province[] = [];

  constructor(
    private title: Title,
    private taxesAPI: TaxesService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Provinces');
    this.taxesAPI.getTaxes().subscribe((provinces: Province[]) => {
      this.provinces = provinces;
    });
  }
}
