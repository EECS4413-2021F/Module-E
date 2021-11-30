import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tax } from 'src/app/models/taxes.model';
import { TaxesService } from 'src/app/services/taxes.service';

@Component({
  selector: 'app-provincial-tax-view',
  styles: [`
    .breadcrumb-item+.breadcrumb-item::before {
      content: ">";
    }
  `],
  template: `
    <ng-template [ngIf]="tax">
      <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#" class="text-decoration-none">Provinces</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ tax.province }}</li>
        </ol>
      </nav>
      <div class="card">
        <div class="card-header text-white bg-primary">Taxes in {{ tax.province }}</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Province: {{ tax.province }}</li>
          <li class="list-group-item">Tax Type: {{ tax.type }}</li>
          <li class="list-group-item">GST: {{ tax.GST }}%</li>
          <li class="list-group-item">PST: {{ tax.PST }}%</li>
        </ul>
      </div>
    </ng-template>
  `
})
export class ProvincialTaxViewComponent implements OnInit {

  tax?: Tax;

  constructor(
    private route: ActivatedRoute,
    private taxesAPI: TaxesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('code')) {
        this.taxesAPI.getTaxByCode(params.get('code')!).subscribe((tax) => {
          this.tax = tax;
        });
      }
    });
  }
}
