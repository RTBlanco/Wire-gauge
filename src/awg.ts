// AWG → mm² reference table (standard values)
const AWG_TABLE = [
  { awg: 0,  mm2: 53.5 },
  { awg: 1,  mm2: 42.4 },
  { awg: 2,  mm2: 33.6 },
  { awg: 4,  mm2: 21.2 },
  { awg: 6,  mm2: 13.3 },
  { awg: 8,  mm2: 8.37 },
  { awg: 10, mm2: 5.26 },
  { awg: 12, mm2: 3.31 },
  { awg: 14, mm2: 2.08 },
  { awg: 16, mm2: 1.31 },
  { awg: 18, mm2: 0.823 },
];

// Pick the smallest wire that still meets or exceeds the required area
export function getAWG(area_mm2: number): number {
  const match = AWG_TABLE
    .slice()
    .reverse() // start from smallest wire
    .find(entry => entry.mm2 >= area_mm2);

  return match ? match.awg : 0; // default to AWG 0 if very large
}