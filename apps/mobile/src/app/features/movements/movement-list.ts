import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import type { Movement } from '@app/contracts';
import {
  countMovementAppearances,
  MovementRepository,
  SessionRepository,
} from '@app/frontend/data-access';
import { EmptyState, ErrorState, LoadingState, splitMovementName } from '@app/frontend/ui';

type ListState =
  | { kind: 'loading' }
  | { kind: 'empty' }
  | { kind: 'error' }
  | { kind: 'ready'; movements: Movement[]; counts: Record<string, number> };

@Component({
  selector: 'mobile-movement-list',
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    LoadingState,
    EmptyState,
    ErrorState,
  ],
  templateUrl: './movement-list.html',
})
export class MovementList {
  private readonly movements = inject(MovementRepository);
  private readonly sessions = inject(SessionRepository);
  protected readonly state = signal<ListState>({ kind: 'loading' });

  constructor() {
    void this.reload();
  }

  protected splitName(name: string): { english: string; chinese: string } {
    return splitMovementName(name);
  }

  protected countFor(counts: Record<string, number>, id: string): number {
    return counts[id] ?? 0;
  }

  protected reload(): void {
    this.state.set({ kind: 'loading' });
    void Promise.all([this.movements.list(), this.sessions.list()])
      .then(([movements, sessions]) => {
        this.state.set(
          movements.length
            ? { kind: 'ready', movements, counts: countMovementAppearances(sessions) }
            : { kind: 'empty' },
        );
      })
      .catch(() => this.state.set({ kind: 'error' }));
  }
}
