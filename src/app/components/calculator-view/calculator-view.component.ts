import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tax } from 'src/app/models/taxes.model';
import { TaxesService } from 'src/app/services/taxes.service';

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
                <select id="province" class="form-select" aria-label="Province" [formControl]="province" required>
                  <option [ngValue]="null" disabled hidden selected>Select A Province...</option>
                  <option *ngFor="let province of provinces" [ngValue]="province">{{ province.province }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="amount-label">$</span>
                <input id="amount" [formControl]="amount"
                      type="text" class="form-control" placeholder="Amount"
                      aria-label="Amount"
                      aria-describedby="amount-label"
                      required>
              </div>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="tax-type-label">Tax Type</span>
                <input id="type" type="text" value="Tax Type"
                      class="form-control" 
                      aria-label="Tax Type" readonly
                      value="{{ province.value?.type }}">
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="gst-label">GST</span>
                <input id="gst" type="text" value="0%"
                      class="form-control"
                      aria-label="GST" readonly
                      value="{{ province.value?.GST | percent }}">
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="pst-label">PST</span>
                <input id="pst" type="text" value="0%"
                      class="form-control"
                      aria-label="PST" readonly
                      value="{{ province.value?.PST | percent }}">
              </div>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="taxes-label">Taxes $</span>
                <input id="taxes" type="text" value="0.00"
                      class="form-control"
                      aria-label="Taxes" readonly
                      value="{{ computeTaxes() | currency }}">
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="total-label">Total $</span>
                <input id="total" type="text" value="0.00"
                      class="form-control"
                      aria-label="Total" readonly
                      value="{{ computeTotal() | currency }}">
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
  province = new FormControl(null, Validators.required);
  amount   = new FormControl(0, Validators.required);

  constructor(private taxesAPI: TaxesService) { }

  ngOnInit(): void {
    this.taxesAPI.getTaxes().subscribe((taxes: Tax[]) => {
      this.provinces = taxes;
    });
  }

  computeTaxes() {
    if (this.province.value) {
      return (+this.amount.value) * (this.province.value!.GST + this.province.value!.PST);
    } else {
      return 0;
    }
  }

  computeTotal() {
    if (this.province.value) {
      return (+this.amount.value) + this.computeTaxes();
    } else {
      return 0;
    }
  }
}
