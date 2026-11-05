const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const PERIODS = [2023, 2024, 2025, 2026].flatMap((year) =>
  MONTHS.map((month, index) => ({ key: `month-${year}-${index + 1}`, label: `${month} ${year} closures` })));

const OFFICES = [
  { id: 'seattle', office: 'Seattle', location: 'Seattle, WA', baseline: 46 },
  { id: 'portland', office: 'Portland', location: 'Portland, OR', baseline: 38 },
  { id: 'phoenix', office: 'Phoenix', location: 'Phoenix, AZ', baseline: 52 },
  { id: 'albuquerque', office: 'Albuquerque', location: 'Albuquerque, NM', baseline: 31 },
  { id: 'atlanta', office: 'Atlanta', location: 'Atlanta, GA', baseline: 57 },
  { id: 'raleigh', office: 'Raleigh', location: 'Raleigh, NC', baseline: 43 },
];

export const WIDE_TABLE_COLUMNS = [
  { key: 'office', header: 'Service office', primary: true },
  { key: 'location', header: 'Location' },
  ...PERIODS.map(({ key, label }) => ({ key, header: label, align: 'right', width: '10rem' })),
];

export const WIDE_TABLE_ROWS = OFFICES.map((office, officeIndex) => ({
  ...office,
  ...Object.fromEntries(PERIODS.map(({ key }, monthIndex) =>
    [key, office.baseline + ((monthIndex * 7 + officeIndex * 11) % 29)])),
}));
