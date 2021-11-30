import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  styles: [],
  template: `
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a id="home-btn" class="navbar-brand" routerLink="/">Taxes</a>
        <a id="calculator-btn" class="navbar-brand" routerLink="/calculator">
          <i class="bi bi-calculator fs-4"></i>
        </a>
      </div>
    </nav>
  `,
})
export class NavbarComponent { }
