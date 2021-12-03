import { NgModule             } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule         } from '@angular/router';
import { HttpClientModule     } from '@angular/common/http';
import { FormsModule          } from '@angular/forms';

import { AppComponent                  } from './app.component';
import { NavbarComponent               } from './components/navbar/navbar.component';
import { ProvincesViewComponent_V1     } from './components/provinces-view/provinces-view-v1.component';
import { ProvincesViewComponent_V2     } from './components/provinces-view/provinces-view-v2.component';
import { ProvincesViewComponent_V3     } from './components/provinces-view/provinces-view-v3.component';
import { ProvincesViewComponent_V4     } from './components/provinces-view/provinces-view-v4.component';
import { ProvincialTaxViewComponent_V1 } from './components/provincial-tax-view/provincial-tax-view-v1.component';
import { ProvincialTaxViewComponent_V2 } from './components/provincial-tax-view/provincial-tax-view-v2.component';
import { ProvincialTaxViewComponent_V3 } from './components/provincial-tax-view/provincial-tax-view-v3.component';
import { ProvincialTaxViewComponent_V4 } from './components/provincial-tax-view/provincial-tax-view-v4.component';
import { CalculatorViewComponent       } from './components/calculator-view/calculator-view.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'v1/provinces', component: ProvincesViewComponent_V1 }, { path: 'v1/provinces/:code', component: ProvincialTaxViewComponent_V1 },
      { path: 'v2/provinces', component: ProvincesViewComponent_V2 }, { path: 'v2/provinces/:code', component: ProvincesViewComponent_V2 },
      { path: 'v3/provinces', component: ProvincesViewComponent_V3 }, { path: 'v3/provinces/:code', component: ProvincesViewComponent_V3 },
      { path: 'v4/provinces', component: ProvincesViewComponent_V4, children: [{ path: ':code',     component: ProvincialTaxViewComponent_V4 }] },
      { path: 'calculator',   component: CalculatorViewComponent },
      { path: 'v1', redirectTo: '/v1/provinces', pathMatch: 'full' },
      { path: 'v2', redirectTo: '/v2/provinces', pathMatch: 'full' },
      { path: 'v3', redirectTo: '/v3/provinces', pathMatch: 'full' },
      { path: 'v4', redirectTo: '/v4/provinces', pathMatch: 'full' },
      { path: '**', redirectTo: '/v1', pathMatch: 'full' },
    ])
  ],
  bootstrap: [AppComponent],
  providers: [
    Title
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    ProvincesViewComponent_V1,
    ProvincesViewComponent_V2,
    ProvincesViewComponent_V3,
    ProvincesViewComponent_V4,
    ProvincialTaxViewComponent_V1,
    ProvincialTaxViewComponent_V2,
    ProvincialTaxViewComponent_V3,
    ProvincialTaxViewComponent_V4,
    CalculatorViewComponent
  ]
})
export class AppModule { }
