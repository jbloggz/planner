import { describe, it, expect } from 'vitest';
import { getCellWidth } from './util';

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