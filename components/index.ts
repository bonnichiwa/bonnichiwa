interface Directory {
  [year: number]: {
    [month: number]: Array<number>
  }
}

export const directory: Directory = {
  2023: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [1, 12],
    9: [],
    10: [20],
    11: [20, 22],
    12: [],
  },
  2024: {
    1: [5, 6, 7, 8, 10, 11, 16, 17, 29, 30],
    2: [1, 2, 7, 13, 15, 17, 25, 27, 28],
    3: [3, 7, 11, 20, 23, 26],
    4: [2, 11, 22],
    5: [10, 24],
    6: [6, 9, 14, 27],
    7: [3, 11, 18],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  }
}

interface MappedMonths {
  [month: string]: number;
}

export const mappedMonths: MappedMonths = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  june: 6,
  july: 7,
  aug: 8,
  sept: 9,
  oct: 10,
  nov: 11,
  dec: 12,
}

interface MappedMonthsReverse {
  [month: number]: string;
}

export const mappedMonthsReverse: MappedMonthsReverse = {
  1: 'jan',
  2: 'feb',
  3: 'mar',
  4: 'apr',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'aug',
  9: 'sept',
  10: 'oct',
  11: 'nov',
  12: 'dec',
}

export const formatMonth = (month: number) => month < 10 ? `0${month}` : month;

export const formatDay = (day: number) => day < 10 ? `0${day}` : day;

export const isMobile = (width: number) => width <= 768;