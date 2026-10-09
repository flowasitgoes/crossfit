import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionRepository } from '@app/frontend/data-access';
import { EmptyState, ErrorState, LoadingState } from '@app/frontend/ui';
import type { Session } from '@app/contracts';

type ListState =
  | { kind: 'loading' }
  | { kind: 'empty' }
  | { kind: 'error' }
  | { kind: 'ready'; sessions: Session[] };

@Component({
  selector: 'web-session-list',
  imports: [RouterLink, LoadingState, EmptyState, ErrorState],
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
