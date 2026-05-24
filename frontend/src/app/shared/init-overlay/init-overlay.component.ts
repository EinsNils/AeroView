import {Component, OnInit, inject, signal} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {InitService} from '../init.service';

@Component({
  selector: 'app-init-overlay',
  standalone: true,
  templateUrl: './init-overlay.component.html',
  styleUrl: './init-overlay.component.scss',
  animations: [
    trigger('fadeOut', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0, pointerEvents: 'none'})),
      transition('visible => hidden', animate('600ms ease-out')),
    ]),
  ],
})
export class InitOverlayComponent implements OnInit {
  private initService = inject(InitService);

  readonly steps = this.initService.steps;
  readonly overlayState = signal<'visible' | 'hidden'>('visible');
  readonly visible = signal(true);

  ngOnInit(): void {
    this.initService.run().then(() => {
      setTimeout(() => {
        this.overlayState.set('hidden');
        setTimeout(() => this.visible.set(false), 650);
      }, 400);
    });
  }
}
