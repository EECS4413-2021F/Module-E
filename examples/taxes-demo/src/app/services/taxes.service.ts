import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InMemoryCache } from '../models/cache.model';
import { Tax } from '../models/taxes.model';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private http: HttpClient) { }

  getTaxes(): Observable<Tax[]> {
    const url = '/api/taxes';
    if (InMemoryCache.hasCache(url)) return InMemoryCache.getCache<Tax[]>(url).observable;
    return (new InMemoryCache<Tax[]>(url, new Observable<Tax[]>((subscriber) => {
      this.http.get<Tax[]>(url).subscribe((taxes) => {
        subscriber.next(taxes.map((tax) => {
          tax.GST /= 100;
          tax.PST /= 100;
          InMemoryCache.putCache('/api/taxes/' + tax.code, of(tax));
          return tax;
        }));
        subscriber.complete();
      });
    }))).observable;
  }

  getTaxByCode(code: string): Observable<Tax> {
    const url = '/api/taxes/' + code;
    if (InMemoryCache.hasCache(url)) return InMemoryCache.getCache<Tax>(url).observable;
    return (new InMemoryCache<Tax>(url, new Observable<Tax>((subscriber) => {
      this.http.get<Tax>(url).subscribe((tax) => {
        tax.GST /= 100;
        tax.PST /= 100;
        subscriber.next(tax);
        subscriber.complete();
      });
    }))).observable;
  }
}
