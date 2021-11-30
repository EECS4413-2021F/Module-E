import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Tax } from '../models/taxes.model';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  private taxesCache?:      Tax[];
  private taxesByCodeCache: {[code: string]: Tax } = {};
  private observableCache:  {[url: string]: Observable<any> } = {};

  constructor(private http: HttpClient) { }

  getTaxes() {
    const url = '/api/taxes';
    if (this.taxesCache) return of(this.taxesCache);
    if (this.observableCache[url]) return this.observableCache[url];
    const observable = new Observable<Tax[]>((subscriber) => {
      this.http.get<Tax[]>(url).subscribe((taxes) => {
        taxes.forEach((tax) => { this.taxesByCodeCache[tax.code] = this.fixTaxPercents(tax); });
        this.taxesCache = taxes;
        subscriber.next(taxes);
        subscriber.complete();
      });
    });
    this.observableCache[url] = observable;
    return observable;
  }

  getTaxByCode(code: string) {
    const url = '/api/taxes/' + code;
    if (this.taxesByCodeCache[code]) return of(this.taxesByCodeCache[code]);
    if (this.observableCache[url]) return this.observableCache[url];
    const observable = new Observable<Tax>((subscriber) => {
      this.http.get<Tax>(url).subscribe((tax) => {
        this.taxesByCodeCache[tax.code] = this.fixTaxPercents(tax);
        subscriber.next(tax);
        subscriber.complete();
      });
    });
    this.observableCache[url] = observable;
    return observable;
  }

  fixTaxPercents(tax: Tax) {
    tax.GST = tax.GST / 100;
    tax.PST = tax.PST / 100;
    return tax;
  }
}
