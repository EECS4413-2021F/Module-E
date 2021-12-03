import { Component, Input } from '@angular/core';

import { Tax } from '../../models/taxes.model';

@Component({
  selector: 'app-provincial-tax-view-v2',
  styles: [`
    .breadcrumb-item+.breadcrumb-item::before {
      content: ">";
    }
  `],
  template: `
    <ng-template [ngIf]="tax">
      <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/v2" class="text-decoration-none">Provinces</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ tax.province }}</li>
        </ol>
      </nav>
      <div class="card">
        <div class="card-header text-white bg-primary">Taxes in {{ tax.province }}</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Province: {{ tax.province }}</li>
          <li class="list-group-item">Tax Type: {{ tax.type }}</li>
          <li class="list-group-item">GST: {{ tax.GST | percent }}</li>
          <li class="list-group-item">PST: {{ tax.PST | percent }}</li>
        </ul>
      </div>
    </ng-template>
  `
})
export class ProvincialTaxViewComponent_V2 {
  @Input() tax?: Tax;
}
