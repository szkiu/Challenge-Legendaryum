export interface Room {
  name: string;
  coinCount: number;
  area: {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    zmin: number;
    zmax: number;
  };
}

export interface Area {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  zmin: number;
  zmax: number;
}
