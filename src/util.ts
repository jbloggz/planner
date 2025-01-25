const getCellWidth = (zoom?: number): number => {
  const widths = [85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15];
  if (zoom === undefined || zoom < 0) {
    zoom = 0;
  } else if (zoom >= widths.length) {
    zoom = widths.length - 1;
  }
  return widths[zoom];
};

export { getCellWidth };
