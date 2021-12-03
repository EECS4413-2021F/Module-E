# Module E - Angular (Web Frameworks)

## Examples

### [Taxes App](examples/taxes-demo/src):

- [`AppModule`](examples/taxes-demo/src/app/app.module.ts)
- Components:
  - [`AppComponent`](examples/taxes-demo/src/app/app.component.ts)
  - `ProvincesViewComponent`:
    - [Basic Implementation](examples/taxes-demo/src/app/components/provinces-view/provinces-view-v1.component.ts)
    - [Embedded Child Component, @Input](examples/taxes-demo/src/app/components/provinces-view/provinces-view-v2.component.ts)
    - [Embedded Child Component, @Output](examples/taxes-demo/src/app/components/provinces-view/provinces-view-v3.component.ts)
    - [Nested Route, Shared Service](examples/taxes-demo/src/app/components/provinces-view/provinces-view-v4.component.ts)
  - `ProvincialTaxViewComponent`:
    - [Basic Implementation](examples/taxes-demo/src/app/components/provincial-tax-view/provincial-tax-view-v1.component.ts)
    - [Embedded Child Component, @Input](examples/taxes-demo/src/app/components/provincial-tax-view/provincial-tax-view-v2.component.ts)
    - [Embedded Child Component, @Output](examples/taxes-demo/src/app/components/provincial-tax-view/provincial-tax-view-v3.component.ts)
    - [Nested Route, Shared Service](examples/taxes-demo/src/app/components/provincial-tax-view/provincial-tax-view-v4.component.ts)
  - `CalculatorViewComponent`:
    - [Template-driven Form](examples/taxes-demo/src/app/components/calculator-view/calculator-view.component.ts)
- Services:
  - [`TaxesService`](examples/taxes-demo/src/app/services/taxes.service.ts)
  - [`SelectedService` for Nested Route](examples/taxes-demo/src/app/services/selected.service.ts)
- Models:
  - [`Tax` Model](examples/taxes-demo/src/app/models/taxes.model.ts)
  - [`InMemoryCache` for `TaxesService`](examples/taxes-demo/src/app/models/cache.model.ts)
