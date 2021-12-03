import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Province        } from '../../models/taxes.model';
import { TaxesService    } from '../../services/taxes.service';
import { SelectedService } from '../../services/selected.service';

@Component({
  selector: 'app-provinces-view-v4',
  styles: [],
  template: `
    <div class="row row-cols-1 row-cols-lg-4 g-4">
      <div class="col col-lg-6">
        <div class="card">
          <div class="card-header">Provinces</div>
          <div id="provinces-list" class="list-group list-group-flush">
            <a *ngFor="let province of provinces"
              [routerLink]="'/v4/provinces/' + province.code " 
              class="list-group-item list-group-item-action province-item"
              [ngClass]="{'active': selectedProvince && selectedProvince.code == province.code }">
              {{ province.province }}
            </a>
          </div>
        </div>
      </div>
      <div class="col col-lg-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class ProvincesViewComponent_V4 implements OnInit {

  provinces: Province[] = [];
  selectedProvince?: Province;

  constructor(
    private title: Title,
    private taxesAPI: TaxesService,
    private selected: SelectedService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Provinces');
    this.taxesAPI.getTaxes().subscribe((provinces: Province[]) => {
      this.provinces = provinces;
    });
    this.selected.valueChange.subscribe((province: Province) => {
      this.selectedProvince = province;
    });
  }
}
