import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Province, Tax } from '../../models/taxes.model';
import { TaxesService  } from '../../services/taxes.service';

@Component({
  selector: 'app-provinces-view-v3',
  styles: [],
  template: `
    <div class="row row-cols-1 row-cols-lg-4 g-4">
      <div class="col col-lg-6">
        <div class="card">
          <div class="card-header">Provinces</div>
          <div id="provinces-list" class="list-group list-group-flush">
            <a *ngFor="let province of provinces"
              [routerLink]="'/v3/provinces/' + province.code " 
              class="list-group-item list-group-item-action province-item"
              [ngClass]="{'active': selected && selected.code == province.code }">
              {{ province.province }}
            </a>
          </div>
        </div>
      </div>
      <div class="col col-lg-6">
        <app-provincial-tax-view-v3 (taxChange)="onTaxChange($event)"></app-provincial-tax-view-v3>
      </div>
    </div>
  `
})
export class ProvincesViewComponent_V3 implements OnInit {

  provinces: Province[] = [];
  selected?: Tax;

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

  onTaxChange(tax: Tax) {
    this.selected = tax;
  }
}
