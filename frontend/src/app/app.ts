import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {InitOverlayComponent} from './shared/init-overlay/init-overlay.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InitOverlayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
