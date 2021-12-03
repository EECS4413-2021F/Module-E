import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Province, Tax } from '../../models/taxes.model';
import { TaxesService  } from '../../services/taxes.service';

@Component({
  selector: 'app-provinces-view-v2',
  styles: [],
  template: `
    <div class="row row-cols-1 row-cols-lg-4 g-4">
      <div class="col col-lg-6">
        <div class="card">
          <div class="card-header">Provinces</div>
          <div id="provinces-list" class="list-group list-group-flush">
            <a *ngFor="let province of provinces"
              [routerLink]="'/v2/provinces/' + province.code " 
              class="list-group-item list-group-item-action province-item"
              [ngClass]="{'active': selected && selected.code == province.code }">
              {{ province.province }}
            </a>
          </div>
        </div>
      </div>
      <div class="col col-lg-6">
        <app-provincial-tax-view-v2 [tax]="selected"></app-provincial-tax-view-v2>
      </div>
    </div>
  `
})
export class ProvincesViewComponent_V2 implements OnInit {

  provinces: Province[] = [];
  selected?: Tax;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private taxesAPI: TaxesService
  ) { }

  ngOnInit(): void {
    this.taxesAPI.getTaxes().subscribe((provinces: Province[]) => {
      this.provinces = provinces;
    });
    this.route.paramMap.subscribe((params) => {
      if (!params.has('code')) {
        this.title.setTitle('Provinces');
      } else {
        this.taxesAPI.getTaxByCode(params.get('code')!).subscribe({
          next: (tax) => {
            this.title.setTitle('Taxes in ' + tax.province);
            this.selected = tax;
          },
          error: () => {
            this.router.navigate(['/v2']);
          }
        });
      }
    });
  }
}
