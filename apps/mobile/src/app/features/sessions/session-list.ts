import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import type { Session } from '@app/contracts';
import { SessionRepository } from '@app/frontend/data-access';
import { EmptyState, ErrorState, LoadingState } from '@app/frontend/ui';

type ListState =
  | { kind: 'loading' }
  | { kind: 'empty' }
  | { kind: 'error' }
  | { kind: 'ready'; sessions: Session[] };

@Component({
  selector: 'mobile-session-list',
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
  templateUrl: './session-list.html',
})
export class SessionList {
  private readonly sessions = inject(SessionRepository);
  protected readonly state = signal<ListState>({ kind: 'loading' });

  constructor() {
    void this.reload();
  }

  protected diaryTitle(sessions: Session[]): string {
    const titles = new Set(sessions.map((session) => session.title.trim()).filter(Boolean));
    return titles.size === 1 ? [...titles][0] : '';
  }

  protected reload(): void {
    this.state.set({ kind: 'loading' });
    void this.sessions
      .list()
      .then((sessions) => {
        this.state.set(sessions.length ? { kind: 'ready', sessions } : { kind: 'empty' });
      })
      .catch(() => this.state.set({ kind: 'error' }));
  }
}
