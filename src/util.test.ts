import { describe, it, expect } from 'vitest';
import { fromEpochDays, getCellHeight, getCellWidth } from './util';
import { toEpochDays } from './util';

describe('getCellWidth', () => {
  it('should return the correct width for a given zoom level', () => {
    expect(getCellWidth(0)).toBe(85);
    expect(getCellWidth(5)).toBe(60);
    expect(getCellWidth(14)).toBe(15);
  });

  it('should return the minimum width for zoom levels less than 0', () => {
    expect(getCellWidth(-1)).toBe(85);
    expect(getCellWidth(-10)).toBe(85);
  });

  it('should return the maximum width for zoom levels greater than the array length', () => {
    expect(getCellWidth(15)).toBe(15);
    expect(getCellWidth(100)).toBe(15);
  });

  it('should return the minimum width when zoom is undefined', () => {
    expect(getCellWidth()).toBe(85);
  });
});

describe('getCellHeight', () => {
  it('should return the default cell height', () => {
    expect(getCellHeight()).toBe(85);
  });
});

describe('toEpochDays', () => {
  it('should return zero for the first day', () => {
    const date = new Date('1970-01-01');
    expect(toEpochDays(date)).toBe(0);
  });

  it('should return the correct number of days for a date in the future', () => {
    const date = new Date('2023-10-10');
    expect(toEpochDays(date)).toBe(19640);
  });

  it('should return the correct number of days for a date before epoch', () => {
    const date = new Date('1969-12-31');
    expect(toEpochDays(date)).toBe(-1);
  });

  it('should handle leap years correctly', () => {
    const date = new Date('2000-02-29');
    expect(toEpochDays(date)).toBe(11016);
  });

  it('should return the correct number of days for a string date', () => {
    const date = '2023-10-10';
    expect(toEpochDays(date)).toBe(19640);
  });

  it('should return the correct number of days for a string date before epoch', () => {
    const date = '1969-12-31';
    expect(toEpochDays(date)).toBe(-1);
  });

  it('should handle leap years correctly for string dates', () => {
    const date = '2000-02-29';
    expect(toEpochDays(date)).toBe(11016);
  });

  it('should return NaN for invalid string dates', () => {
    const date = 'invalid-date';
    expect(toEpochDays(date)).toBeNaN();
  });
});
describe('fromEpochDays', () => {
  it('should return the correct date for zero epoch days', () => {
    expect(fromEpochDays(0)).toBe('1970-01-01');
  });

  it('should return the correct date for positive epoch days', () => {
    expect(fromEpochDays(19640)).toBe('2023-10-10');
  });

  it('should return the correct date for negative epoch days', () => {
    expect(fromEpochDays(-1)).toBe('1969-12-31');
  });

  it('should handle leap years correctly', () => {
    expect(fromEpochDays(11016)).toBe('2000-02-29');
  });

  it('should return the correct date for large positive epoch days', () => {
    expect(fromEpochDays(30000)).toBe('2052-02-20');
  });

  it('should return the correct date for large negative epoch days', () => {
    expect(fromEpochDays(-1000)).toBe('1967-04-07');
  });
});
