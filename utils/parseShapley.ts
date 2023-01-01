type Tuple = [number, number];

export const parsePoint = (geometry: string): Tuple => {
  const numbers = geometry.split(/\((.*?)\)/);

  const latLon = numbers[1].split(" ");
  return [parseFloat(latLon[1]), parseFloat(latLon[0])];
};

export const parseLineString = (geometry: string): Tuple[] => {
  const numbers = geometry.split(/\((.*?)\)/);
  const points = numbers[1].split(",");

  return points.map((point) => {
    const latLon = point.split(" ");
    return [parseFloat(latLon[1]), parseFloat(latLon[0])];
  });
};
