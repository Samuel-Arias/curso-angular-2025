import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/country-layout/country-layout.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: 'by-country',
        loadComponent: () => import('./pages/by-country-page/by-country-page.component').then(m => m.ByCountryPageComponent)
      },
      {
        path: 'by-region',
        loadComponent: () => import('./pages/by-region-page/by-region-page.component').then(m => m.ByRegionPageComponent)
      },
      {
        path: 'by/:code',
        loadComponent: () => import('./pages/country-page/country-page.component').then(m => m.CountryPageComponent)
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
];

export default countryRoutes
