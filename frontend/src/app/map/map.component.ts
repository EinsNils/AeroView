import {Component, ElementRef, OnDestroy, ViewChild, afterNextRender, effect, inject} from '@angular/core';
import * as leaflet from 'leaflet';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InitService} from '../shared/init.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnDestroy {
  @ViewChild('mapContainer', {static: true}) mapContainer!: ElementRef<HTMLDivElement>;

  private map?: leaflet.Map;

  constructor() {
    afterNextRender(() => this.initMap());

    const initService = inject(InitService);
    effect(() => {
      if (initService.allDone()) {
        setTimeout(() => this.map?.invalidateSize(), 700);
      }
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    this.map = leaflet.map(this.mapContainer.nativeElement, {
      center: [51.16, 10.45],
      zoom: 5,
      zoomControl: false,
      scrollWheelZoom: true,
      dragging: true,
    });

    leaflet.control.zoom({position: 'bottomleft'}).addTo(this.map);

    leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(this.map);
  }
}
