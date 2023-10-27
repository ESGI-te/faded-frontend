import dayjsLib from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjsLib.extend(isSameOrBefore);
dayjsLib.extend(isSameOrAfter);

export const dayjs = dayjsLib;
