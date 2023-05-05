import { mean, round, sortBy } from 'lodash';
import { TOccupancyRate, TOccupancyRateParams } from './types';
import { dayjs } from '../date/dayjs';

/**
 * Returns the occupancy rate by day.
 * @param {TOccupancyRateParams} params
 * @returns {TOccupancyRate[]}
 */
export const getOccupancyRateByDay = (params: TOccupancyRateParams): TOccupancyRate[] => {
  const occupancyMap: { [key: string]: number } = {};

  const startDate = dayjs(params.startDate).startOf('day');
  const endDate = dayjs(params.endDate).startOf('day');

  let date = startDate;
  while (date.isSameOrBefore(endDate)) {
    occupancyMap[date.format('YYYY-MM-DD')] = 0;
    date = date.add(1, 'day');
  }

  params.reservations.forEach((reservation) => {
    const checkInDay = dayjs(reservation.checkInAt).startOf('day');
    let checkOutDay = dayjs(reservation.checkOutAt).startOf('day');

    if (!checkInDay.isSame(checkOutDay)) {
      checkOutDay = checkOutDay.subtract(1, 'day');
    }

    let day = checkInDay;
    while (day.isSameOrBefore(checkOutDay)) {
      const dayKey = day.format('YYYY-MM-DD');
      occupancyMap[dayKey] = occupancyMap[dayKey] + 100;
      day = day.add(1, 'day');
    }
  });

  const reservations = Object.entries(occupancyMap).map(([date, occupancy]) => {
    const numberOfReservations = occupancy;
    const numberOfReservationsUnit = occupancy / 100;

    if (numberOfReservations > 0) {
      // Handle 100% occupancy
      if (params.numberOfProperties === numberOfReservationsUnit) {
        return { date, occupancyRate: 100 };
      } else {
        return { date, occupancyRate: (numberOfReservationsUnit / params.numberOfProperties) * 100 };
      }
    }

    return { date, occupancyRate: 0 };
  });

  return sortBy(reservations, 'date');
};

/**
 * Returns the occupancy rate by month.
 * @param {TOccupancyRateParams} params
 * @returns {TOccupancyRate[]}
 */
export const getOccupancyRateByMonth = (params: TOccupancyRateParams): TOccupancyRate[] => {
  const reservations = getOccupancyRateByDay(params);

  const groupedReservations: { [key: string]: { date: string; occupancyRates: number[] } } = {};

  for (const reservation of reservations) {
    const month = dayjs(reservation.date).format('YYYY-MM');

    if (!groupedReservations[month]) {
      groupedReservations[month] = {
        date: month,
        occupancyRates: [reservation.occupancyRate],
      };
    } else {
      groupedReservations[month].occupancyRates.push(reservation.occupancyRate);
    }
  }

  const rates = Object.entries(groupedReservations).map(([date, value]) => ({
    date,
    occupancyRate: round(mean(value.occupancyRates), 2),
  }));

  return sortBy(rates, 'date');
};
