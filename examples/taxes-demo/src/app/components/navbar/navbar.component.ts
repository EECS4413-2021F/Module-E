import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  styles: [],
  template: `
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a id="home-btn" class="navbar-brand">Taxes Demo</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" routerLink="/v1">Version 1</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/v2">Version 2</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/v3">Version 3</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/v4">Version 4</a></li>
        </ul>
        <a id="calculator-btn" class="navbar-brand" routerLink="/calculator">
          <i class="bi bi-calculator fs-4"></i>
        </a>
      </div>
    </nav>
  `,
})
export class NavbarComponent { }
