import {Injectable, computed, signal} from '@angular/core';

export type StepStatus = 'pending' | 'loading' | 'success' | 'error';

export interface InitStep {
  id: string;
  label: string;
  status: StepStatus;
}

@Injectable({providedIn: 'root'})
export class InitService {
  readonly steps = signal<InitStep[]>([
    {id: 'backend', label: 'Verbindung zum Backend', status: 'pending'},
    {id: 'map', label: 'Karte wird geladen', status: 'pending'},
  ]);

  readonly allDone = computed(() =>
    this.steps().every(s => s.status === 'success' || s.status === 'error')
  );

  async run(): Promise<void> {
    await this.runStep('backend', () => delay(800)); // später: HttpClient.get('/api/health')
    await this.runStep('map', () => delay(600));     // später: Map-ready-Event
  }

  private async runStep(id: string, task: () => Promise<void>): Promise<void> {
    this.setStatus(id, 'loading');
    try {
      await task();
      this.setStatus(id, 'success');
    } catch {
      this.setStatus(id, 'error');
    }
  }

  private setStatus(id: string, status: StepStatus): void {
    this.steps.update(steps => steps.map(s => (s.id === id ? {...s, status} : s)));
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
