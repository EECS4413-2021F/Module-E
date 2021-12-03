import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Tax          } from '../../models/taxes.model';
import { TaxesService } from '../../services/taxes.service';

@Component({
  selector: 'app-calculator-view',
  styles: [],
  template: `
    <div class="card">
      <div class="card-header text-dark bg-warning">Calculator</div>
      <div class="card-body">
        <div class="container">
          <div class="row align-items-start">
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="province-label">Province</span>
                <select id="province" class="form-select" aria-label="Province" [(ngModel)]="province" required>
                  <option [ngValue]="undefined" disabled hidden selected>Select A Province...</option>
                  <option *ngFor="let province of provinces" [ngValue]="province">{{ province.province }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="amount-label" aria-label="Amount">$</span>
                <input type="text" id="amount" [(ngModel)]="amount" required class="form-control" placeholder="Amount">
              </div>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="tax-type-label">Tax Type</span>
                <input id="type" type="text" value="Tax Type" class="form-control" readonly value="{{ province?.type }}">
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="gst-label">GST</span>
                <input id="gst" type="text" value="0%" class="form-control" readonly value="{{ province?.GST | percent }}">
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="pst-label">PST</span>
                <input id="pst" type="text" value="0%" class="form-control" readonly value="{{ province?.PST | percent }}">
              </div>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="taxes-label">Taxes $</span>
                <input id="taxes" type="text" value="0.00" class="form-control" readonly value="{{ computeTaxes() | currency }}">
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="total-label">Total $</span>
                <input id="total" type="text" value="0.00" class="form-control" readonly value="{{ computeTotal() | currency }}">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalculatorViewComponent implements OnInit {

  provinces!: Tax[];
  province?: Tax;
  amount: number = 0;

  constructor(
    private title: Title,
    private taxesAPI: TaxesService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Calculator');
    this.taxesAPI.getTaxes().subscribe((taxes: Tax[]) => {
      this.provinces = taxes;
    });
  }

  computeTaxes() {
    if (this.province) {
      return (+this.amount) * (this.province!.GST + this.province!.PST);
    } else {
      return 0;
    }
  }

  computeTotal() {
    if (this.province) {
      return (+this.amount) + this.computeTaxes();
    } else {
      return 0;
    }
  }
}
