import MockDate from 'mockdate';
import { getOccupancyRateByDay, getOccupancyRateByMonth, TOccupancyRateParams } from '../src';

describe('getOccupancyRateByDay', () => {
  beforeAll(() => {
    MockDate.set('2024-01-01T00:00:00Z');
  });

  afterAll(() => {
    MockDate.reset();
  });

  const params: TOccupancyRateParams = {
    reservations: [
      {
        checkInAt: new Date('2023-05-01T00:00:00Z'),
        checkOutAt: new Date('2023-05-03T00:00:00Z'),
      },
      {
        checkInAt: new Date('2023-05-04T00:00:00Z'),
        checkOutAt: new Date('2023-05-06T00:00:00Z'),
      },
    ],
    startDate: new Date('2023-05-01T00:00:00Z'),
    endDate: new Date('2023-05-06T00:00:00Z'),
    numberOfProperties: 10,
  };

  it('should return the correct occupancy rate by day', () => {
    const result = getOccupancyRateByDay(params);

    expect(result).toMatchSnapshot();
  });
});

describe('getOccupancyRateByMonth', () => {
  beforeAll(() => {
    MockDate.set('2025-01-01T00:00:00Z');
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('returns correct occupancy rates by month', () => {
    const params = {
      reservations: [
        { checkInAt: new Date('2022-01-01'), checkOutAt: new Date('2022-01-03') },
        { checkInAt: new Date('2022-01-02'), checkOutAt: new Date('2022-01-04') },
        { checkInAt: new Date('2022-02-01'), checkOutAt: new Date('2022-02-03') },
        { checkInAt: new Date('2022-02-02'), checkOutAt: new Date('2022-02-04') },
      ],
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-02-28'),
      numberOfProperties: 2,
    };

    const occupancyRates = getOccupancyRateByMonth(params);

    expect(occupancyRates).toMatchSnapshot();
  });
});
