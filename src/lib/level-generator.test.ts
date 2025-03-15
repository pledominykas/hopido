import { describe, test, expect } from 'vitest';
import { generateLevel } from './level-generator';

describe('level-generator', () => {
  test('should generate random level with 10 steps on a 10x10 grid', () => {
    const level = generateLevel('test-seed-1', 10, 10);

    expect(level);
  });
});
