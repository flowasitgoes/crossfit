import { Component, input } from '@angular/core';
import type { Session, SessionItem } from '@app/contracts';
import { sessionOverviews } from '@app/frontend/data-access';

export interface ClassMedia {
  imageUrl: string | null;
  videoUrl: string | null;
  cues: string;
}

@Component({
  selector: 'cf-class-detail',
  templateUrl: './class-detail.html',
})
export class ClassDetail {
  readonly session = input.required<Session>();
  readonly media = input<Record<string, ClassMedia>>({});

  protected readonly repdbHref = 'https://repdb.co';
  protected readonly workoutGuideHref = 'https://bryllim.com';
  protected readonly workoutGuideLicenseHref = 'https://creativecommons.org/licenses/by-sa/4.0/';
  protected readonly everkineticHref = 'https://github.com/everkinetic/data';

  protected showsRepdbCredit(url: string | null): boolean {
    return !!url?.includes('/media/repdb/');
  }

  protected showsWorkoutGuideCredit(url: string | null): boolean {
    return !!url?.includes('/media/workout-guide/');
  }

  protected isSequence(url: string | null): boolean {
    return !!url && (url.includes('/media/prep/') || this.isEmomSquare(url));
  }

  protected isIconCard(url: string | null): boolean {
    return this.isEmomSquare(url);
  }

  private isEmomSquare(url: string | null): boolean {
    return !!url && (url.includes('/media/single-arm-muscle-clean.jpg') || url.includes('/media/single-arm-push-press.jpg'));
  }

  protected overviewUrl(): string | null {
    return sessionOverviews[this.session().id] ?? null;
  }

  protected itemLabel(blockIndex: number, itemIndex: number): string {
    const prior = this.session()
      .blocks.slice(0, blockIndex)
      .reduce((sum, block) => sum + block.items.length, 0);
    return String(prior + itemIndex + 1).padStart(2, '0');
  }

  protected workAndRest(value: string): { work: string; rest: string } | null {
    const match = value.trim().match(/^(.+?)，休息 (.+)$/);
    if (!match?.[1] || !match[2]) {
      return null;
    }
    return { work: match[1], rest: match[2] };
  }

  protected laterality(note: string): { left: string; right: string } | null {
    const match = note.trim().match(/^(\d+)\s*\/\s*(\d+)$/);
    if (!match?.[1] || !match[2]) {
      return null;
    }
    return { left: match[1], right: match[2] };
  }

  protected noteIsStat(note: string): boolean {
    const value = note.trim();
    return value.length > 0 && value.length <= 12 && !value.includes(' ');
  }

  protected coachingCues(item: SessionItem): string[] | null {
    const cues = this.mediaFor(item.movementId)?.cues.trim() ?? '';
    if (!cues || cues === item.note.trim()) {
      return null;
    }
    const lines = (cues.includes('\n') ? cues.split('\n') : cues.split(/(?=[①②③④⑤])/))
      .map((line) => line.trim())
      .filter(Boolean);
    return lines.length ? lines : null;
  }

  protected mediaFor(movementId: string | null): ClassMedia | null {
    if (!movementId) {
      return null;
    }
    return this.media()[movementId] ?? null;
  }

  protected diaryLines(session: Session): Array<{ label: string; value: string }> {
    return [
      { label: '', value: session.athleteNote },
      { label: '老師的感受', value: session.coachNote },
      { label: '上課地點', value: session.location },
      { label: '器材', value: session.equipment },
      { label: '天氣', value: session.weather },
    ].filter((line) => line.value.trim());
  }

  protected noteList(value: string): string[] | null {
    const lines = value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    if (!lines.length || !lines.every((line) => line.startsWith('-'))) {
      return null;
    }
    return lines.map((line) => line.replace(/^-\s*/, ''));
  }
}
