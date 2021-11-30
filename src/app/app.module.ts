import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent               } from './app.component';
import { NavbarComponent            } from './components/navbar/navbar.component';
import { ProvincesViewComponent     } from './components/provinces-view/provinces-view.component';
import { ProvincialTaxViewComponent } from './components/provincial-tax-view/provincial-tax-view.component';
import { CalculatorViewComponent    } from './components/calculator-view/calculator-view.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'provinces',       component: ProvincesViewComponent },
      { path: 'provinces/:code', component: ProvincialTaxViewComponent },
      { path: 'calculator',      component: CalculatorViewComponent },
      { path: '',   redirectTo: '/provinces', pathMatch: 'full' },
      { path: '**', redirectTo: '/provinces', pathMatch: 'full' },
    ])
  ],
  bootstrap: [AppComponent],
  providers: [
    Title
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    ProvincesViewComponent,
    ProvincialTaxViewComponent,
    CalculatorViewComponent
  ]
})
export class AppModule { }
