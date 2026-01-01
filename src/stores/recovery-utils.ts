export const ordinalWords = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth',
  'Eleventh',
  'Twelfth',
  'Thirteenth',
  'Fourteenth',
  'Fifteenth',
  'Sixteenth',
  'Seventeenth',
  'Eighteenth',
  'Nineteenth',
  'Twentieth',
] as const

export const MINUTES = {
  minute: 1,
  hour: 60,
  day: 60 * 24,
  week: 60 * 24 * 7,
} as const

export const abandonedSchedule: number[] = [
  5 * MINUTES.minute, // 5 minutes
  MINUTES.day, // 1 day
  2 * MINUTES.day, // 2 days
  4 * MINUTES.day, // 4 days
  MINUTES.week, // 1 week
]

export const scheduleOptions = [
  { label: '5 minutes', value: 5 },
  { label: '10 minutes', value: 10 },
  { label: '15 minutes', value: 15 },
  { label: '20 minutes', value: 20 },
  { label: '25 minutes', value: 25 },
  { label: '30 minutes', value: 30 },
  { label: '40 minutes', value: 40 },
  { label: '50 minutes', value: 50 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: '3 hours', value: 180 },
  { label: '4 hours', value: 240 },
  { label: '5 hours', value: 300 },
  { label: '6 hours', value: 360 },
  { label: '7 hours', value: 420 },
  { label: '8 hours', value: 480 },
  { label: '9 hours', value: 540 },
  { label: '10 hours', value: 600 },
  { label: '11 hours', value: 660 },
  { label: '12 hours', value: 720 },
  { label: '18 hours', value: 1080 },
  { label: '1 day', value: 1440 },
  { label: '2 days', value: 2880 },
  { label: '3 days', value: 4320 },
  { label: '4 days', value: 5760 },
  { label: '5 days', value: 7200 },
  { label: '6 days', value: 8640 },
  { label: '1 week', value: 10080 },
  { label: '2 weeks', value: 20160 },
  { label: '3 weeks', value: 30240 },
  { label: '1 month', value: 43200 },
  { label: '2 months', value: 86400 },
  { label: '3 months', value: 129600 },
]