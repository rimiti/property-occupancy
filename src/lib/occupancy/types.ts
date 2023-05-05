type TOccupancyRate = {
  date: string;
  occupancyRate: number;
};

type Reservation = {
  checkInAt: Date;
  checkOutAt: Date;
};

type TOccupancyRateParams = {
  reservations: Reservation[];
  startDate: Date;
  endDate: Date;
  numberOfProperties: number;
};

export { TOccupancyRate, Reservation, TOccupancyRateParams };
