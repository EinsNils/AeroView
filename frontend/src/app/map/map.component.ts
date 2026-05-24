import {Component, ElementRef, OnDestroy, ViewChild, afterNextRender} from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnDestroy {
  @ViewChild('mapContainer', {static: true}) mapContainer!: ElementRef<HTMLDivElement>;

  private map?: leaflet.Map;

  constructor() {
    afterNextRender(() => this.initMap());
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    this.map = leaflet.map(this.mapContainer.nativeElement, {
      center: [51.16, 10.45],
      zoom: 5,
      scrollWheelZoom: true,
      dragging: true,
    });

    leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(this.map);
  }
}
