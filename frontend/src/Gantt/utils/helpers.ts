import { format } from 'date-fns';
import { getMoonIllumination, getTimes } from 'suncalc';

export const formatDay = (date: Date) => {
  const { sunrise, sunset } = getTimes(date, 31.3547, 34.3088);

  return `${format(date, 'dd.M')} <small>(${format(
    sunrise,
    'HH:mm'
  )} - ${format(sunset, 'HH:mm')})</small>`;
};

export const formatHour = (date: Date) => {
  const { fraction } = getMoonIllumination(date);
  const illumination = Math.round(fraction * 100);

  return `${format(date, 'HH:mm')} <small>${illumination}%</small>`;
};
