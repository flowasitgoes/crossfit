import { describe, expect, it } from 'vitest';
import { movements, sessions } from '../../shared/frontend/data-access/src/catalog';

const october14 = sessions.find((session) => session.id === 'session-2026-10-14');

describe('October 14 session', () => {
  it('keeps warm-up, movement prep, and the timed piece on one class', () => {
    expect(october14?.trainedOn).toBe('2026-10-14');
    expect(october14?.blocks.map((block) => block.title)).toEqual([
      'Warm-Up 暖身',
      'Movement Prep 動作準備',
      'WOD（For Time：計時完成 4 輪）',
    ]);
  });

  it('keeps laterality, cues, and round counts without extra fields', () => {
    const warmup = october14?.blocks[0];
    const prep = october14?.blocks[1];
    const wod = october14?.blocks[2];
    expect(warmup?.scheme).toBe('共 2 輪。');
    expect(warmup?.items.map((item) => item.name)).toEqual([
      'Inch Worms 毛毛蟲',
      'Plank to Shoulder Taps 棒式碰肩',
      'Air Squats 徒手深蹲',
      'Single Leg Deadlift 單腳硬舉',
    ]);
    expect(warmup?.items.map((item) => item.frequencyAndTime)).toEqual(['5', '10', '15', '20']);
    expect(warmup?.items[1]?.note).toBe('5/5');
    expect(prep?.items.map((item) => item.name)).toEqual([
      'Single Arm Triple Extension 單手三重伸展',
      'Single Arm Scarecrow Pull 單手稻草人拉',
      'Muscle Clean 肌力上搏',
    ]);
    expect(prep?.items.map((item) => item.frequencyAndTime)).toEqual(['8', '8', '8']);
    expect(wod?.scheme).toContain('髖關節折疊');
    expect(wod?.items[0]?.frequencyAndTime).toBe('12');
    expect(wod?.items[0]?.note).toBe('6/6');
    expect(wod?.items.map((item) => item.name)).toEqual([
      'Single Arm Muscle Clean 單手上搏',
      'Single Leg Deadlift 單腳硬舉',
      'Burpees 波比跳',
    ]);
    expect(october14?.athleteNote).toContain('毛毛蟲要記得回到腳打直');
    expect(october14?.athleteNote).toContain('摸壺鈴的動作');
    expect(october14?.coachNote).toBe('');
    expect(movements.find((movement) => movement.id === 'inch-worms')?.cues).toContain('棒式');
    expect(movements.find((movement) => movement.id === 'burpees')?.cues).toContain('胸口觸地');
    expect(movements.find((movement) => movement.id === 'single-leg-deadlift')?.cues).toContain(
      '髖關節折疊',
    );
  });
});
