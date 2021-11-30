import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [],
  template: `
    <app-navbar></app-navbar>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'E';
}
