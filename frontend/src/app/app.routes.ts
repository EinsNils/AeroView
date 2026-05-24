import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'map',      loadChildren: () => import('./map/map.routes').then(m => m.MAP_ROUTES) },
  { path: 'flights',  loadChildren: () => import('./flights/flights.routes').then(m => m.FLIGHT_ROUTES) },
  { path: 'airports', loadChildren: () => import('./airports/airports.routes').then(m => m.AIRPORT_ROUTES) },
  { path: 'auth',     loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES) },
  { path: '',         redirectTo: 'map', pathMatch: 'full' },
];
