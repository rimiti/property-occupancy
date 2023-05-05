# property-occupancy
[![Build][build-badge]][build]
[![License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]


## Description

This module provides a property occupancy (Airbnb, Booking, Real Estate..) calculator.

## Install

```bash
$ yarn add @rimiti/property-occupancy
```

## Features

- getOccupancyRateByDay: Get occupancy rate by day.
- getOccupancyRateByMonth: Get occupancy rate by month.

## Usage


### GetOccupancyRateByDay

```ts
import {getOccupancyRateByDay} from '@rimiti/property-occupancy';

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

const result = getOccupancyRateByDay(params);
```

```json
 [
     {
         "date": "2023-05-01",
         "occupancyRate": 10
     },
     {
         "date": "2023-05-02",
         "occupancyRate": 10
     },
     {
         "date": "2023-05-03",
         "occupancyRate": 0
     },
     {
         "date": "2023-05-04",
         "occupancyRate": 10
     },
     {
         "date": "2023-05-05",
         "occupancyRate": 10
     },
     {
         "date": "2023-05-06",
         "occupancyRate": 0
     }
 ]
```

### GetOccupancyRateByMonth

```ts
import {getOccupancyRateByMonth} from '@rimiti/property-occupancy';

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
```

```json
 [
     {
         "date": "2022-01",
         "occupancyRate": 6.45,
     },
     {
         "date": "2022-02",
         "occupancyRate": 7.14
     }
 ]
```

## Scripts

Run using yarn run `<script>` command.

    clean       - Remove temporarily folders.
    build       - Compile source files.
    build:watch - Interactive watch mode, compile sources on change.
    lint        - Lint source files.
    lint:fix    - Fix lint source files.
    test        - Runs all tests with coverage.
    test:watch  - Interactive watch mode, runs tests on change.


## License
MIT © [Dimitri DO BAIRRO](https://github.com/rimiti/property-occupancy/blob/master/LICENSE)

[build-badge]: https://github.com/rimiti/property-occupancy/workflows/Test/badge.svg
[build]: https://github.com/rimiti/property-occupancy/actions?query=workflow%3ATest+branch%3Amaster
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/rimiti/property-occupancy/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com