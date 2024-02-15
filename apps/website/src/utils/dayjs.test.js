// dayjs.test.js
import { dayjs } from './dayjs';

describe('dayjs with plugins', () => {
    it('should determine if a date is the same or before another date', () => {
        const date = dayjs('2024-02-14').startOf('day');
        const sameDate = dayjs('2024-02-14').startOf('day');
        const beforeDate = dayjs('2024-02-13').startOf('day');
        const afterDate = dayjs('2024-02-15').startOf('day');
        expect(date.isSameOrBefore(sameDate)).toBe(true);
        expect(date.isSameOrBefore(beforeDate)).toBe(false);
        expect(date.isSameOrBefore(afterDate)).toBe(true);
      });
    

  it('should determine if a date is the same or after another date', () => {
    const date = dayjs('2024-02-14').startOf('day');
    const sameDate = dayjs('2024-02-14').startOf('day');
    const beforeDate = dayjs('2024-02-13').startOf('day');
    const afterDate = dayjs('2024-02-15').startOf('day');

    expect(date.isSameOrAfter(sameDate)).toBe(true);
    expect(date.isSameOrAfter(beforeDate)).toBe(true); 
    expect(date.isSameOrAfter(afterDate)).toBe(false); 
  });

  it('should determine if a date is between two other dates', () => {
    const date = dayjs('2024-02-14').startOf('day');
    const beforeDate = dayjs('2024-02-13').startOf('day');
    const afterDate = dayjs('2024-02-15').startOf('day');
    const farFutureDate = dayjs('2024-02-20').startOf('day');

    expect(date.isBetween(beforeDate, farFutureDate)).toBe(true);
    expect(beforeDate.isBetween(date, farFutureDate)).toBe(false);
    expect(afterDate.isBetween(beforeDate, date)).toBe(false);
  });
});
