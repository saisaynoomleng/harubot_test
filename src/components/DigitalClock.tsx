import { GeoLocation } from '@/lib/types';
import { clsx, twMerge } from 'cn';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';

type DigitalClockProps = {
  className?: string;
  location?: GeoLocation;
};

const defaultLocation: GeoLocation = {
  city: 'Cleveland',
  country: 'United States',
  timezone: 'America/New_York',
};

export const DigitalClock = React.memo(
  ({
    className,
    location = defaultLocation,
  }: DigitalClockProps): React.JSX.Element => {
    const [time, setTime] = useState('');

    useEffect(() => {
      const updateTime = () => {
        setTime(
          new Intl.DateTimeFormat('en-US', {
            timeZone: location.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(new Date()),
        );
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }, [location.timezone]);

    return (
      <Card
        className={twMerge(
          clsx(
            'p-4 w-full bg-linear-to-b from-purple-300/20 to-purple-800/20',
            className,
          ),
        )}
      >
        <CardHeader>
          <CardTitle>
            Current Time for{' '}
            <span className="text-blue-300 capitalize">
              {location.city}, {location.country}
            </span>
          </CardTitle>

          <div className="text-4xl font-semibold tabular-nums">
            {time || '--:--:--'}
          </div>

          <p className="text-sm text-muted-foreground">{location.timezone}</p>
        </CardHeader>
      </Card>
    );
  },
);
