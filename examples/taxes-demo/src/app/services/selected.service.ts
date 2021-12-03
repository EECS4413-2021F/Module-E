import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Tax } from '../models/taxes.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedService {
  selected = new Subject<Tax>();
  valueChange = this.selected.asObservable();
  setValue(tax: Tax) {
    this.selected.next(tax);
  }
}
