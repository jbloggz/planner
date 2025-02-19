const getCellWidth = (zoom?: number): number => {
  const widths = [85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15];
  if (zoom === undefined || zoom < 0) {
    zoom = 0;
  } else if (zoom >= widths.length) {
    zoom = widths.length - 1;
  }
  return widths[zoom];
};

const getCellHeight = (): number => {
  return 85;
};

const toEpochDays = (date: Date | string): number => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const epoch = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(epoch / (1000 * 60 * 60 * 24));
};

const fromEpochDays = (days: number): string => {
  const date = new Date(Date.UTC(1970, 0, 1));
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const dateToString = (date: Date): string => {
  return fromEpochDays(toEpochDays(date));
};

const addDays = (startDate: Date | string, days: number): Date => {
  const date = new Date(startDate);
  let count = Math.abs(days);
  const increment = days / Math.abs(days);
  while (count > 0) {
    date.setDate(date.getDate() + increment);
    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() + increment);
    }
    count--;
  }
  return date;
};

export { getCellWidth, getCellHeight, toEpochDays, fromEpochDays, dateToString, addDays };
