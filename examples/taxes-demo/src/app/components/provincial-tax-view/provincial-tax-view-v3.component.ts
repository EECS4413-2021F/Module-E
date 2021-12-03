import { Component, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Tax          } from '../../models/taxes.model';
import { TaxesService } from '../../services/taxes.service';

@Component({
  selector: 'app-provincial-tax-view-v3',
  styles: [`
    .breadcrumb-item+.breadcrumb-item::before {
      content: ">";
    }
  `],
  template: `
    <ng-template [ngIf]="tax">
      <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/v3" class="text-decoration-none">Provinces</a></li>
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
export class ProvincialTaxViewComponent_V3 {

  tax?: Tax;

  @Output() taxChange = new EventEmitter<Tax>();

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private taxesAPI: TaxesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('code')) {
        this.taxesAPI.getTaxByCode(params.get('code')!).subscribe({
          next: (tax) => {
            this.title.setTitle('Taxes in ' + tax.province);
            this.tax = tax;
            this.taxChange.emit(tax);
          },
          error: () => {
            this.router.navigate(['/v3']);
          }
        });
      }
    });
  }
}
