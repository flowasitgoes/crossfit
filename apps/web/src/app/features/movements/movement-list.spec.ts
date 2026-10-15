import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MovementRepository, SessionRepository } from '@app/frontend/data-access';
import { MovementList } from './movement-list';

describe('MovementList', () => {
  it('uses a different sentence for loading and for an empty library', async () => {
    let resolveList: (movements: []) => void = () => undefined;
    TestBed.configureTestingModule({
      imports: [MovementList],
      providers: [
        provideRouter([]),
        {
          provide: MovementRepository,
          useValue: { list: () => new Promise((resolve) => (resolveList = resolve)) },
        },
        {
          provide: SessionRepository,
          useValue: { list: () => Promise.resolve([]) },
        },
      ],
    });
    const fixture = TestBed.createComponent(MovementList);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('正在讀取動作');
    expect(fixture.nativeElement.textContent).not.toContain('還沒有動作');

    resolveList([]);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('還沒有動作');
    expect(fixture.nativeElement.textContent).not.toContain('正在讀取動作');
  });
});
