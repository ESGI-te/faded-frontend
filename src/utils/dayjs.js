import dayjsLib from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

dayjsLib.extend(isSameOrBefore);
dayjsLib.extend(isSameOrAfter);
dayjsLib.extend(isBetween);

export const dayjs = dayjsLib;
