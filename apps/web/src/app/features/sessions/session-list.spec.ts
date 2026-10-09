import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { Session } from '@app/contracts';
import { SessionRepository } from '@app/frontend/data-access';
import { SessionList } from './session-list';

const october7: Session = {
  id: 's1',
  title: 'WOD October 7',
  trainedOn: '2026-10-07',
  location: '',
  equipment: '',
  weather: '',
  athleteNote: '',
  coachNote: '',
  blocks: [],
};

describe('SessionList', () => {
  function setup(list: () => Promise<Session[]>) {
    TestBed.configureTestingModule({
      imports: [SessionList],
      providers: [provideRouter([]), { provide: SessionRepository, useValue: { list } }],
    });
    const fixture = TestBed.createComponent(SessionList);
    fixture.detectChanges();
    return fixture;
  }

  it('shows loading before the class list arrives', async () => {
    let resolveList: (sessions: Session[]) => void = () => undefined;
    const fixture = setup(() => new Promise((resolve) => (resolveList = resolve)));
    expect(fixture.nativeElement.textContent).toContain('正在讀取課表');
    expect(fixture.nativeElement.textContent).not.toContain('還沒有上課紀錄');

    resolveList([]);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('還沒有上課紀錄');
    expect(fixture.nativeElement.textContent).not.toContain('正在讀取課表');
  });

  it('links a class by its title', async () => {
    const fixture = setup(() => Promise.resolve([october7]));
    await fixture.whenStable();
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a[href="/sessions/s1"]') as HTMLAnchorElement;
    expect(link.textContent?.trim()).toBe('2026-10-07');
    expect(fixture.nativeElement.querySelector('.diary-title')?.textContent).toContain('WOD October 7');
  });

  it('shows the read error on failure', async () => {
    const fixture = setup(() => Promise.reject(new Error('offline')));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('讀取失敗，請再試一次');
  });
});
