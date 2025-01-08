import React, { useState } from 'react';

interface OperatingHoursProps {
    hours: { [key: string]: string };
    onUpdate: (hours: { [key: string]: string }) => void;
}

const DAYS = ['mon', 'tue', 'web', 'thu', 'fri', 'sat', 'sun'];
const DAY_NAMES: { [key: string]: string } = {
  'mon': 'Monday',
  'tue': 'Tuesday',
  'web': 'Wednesday',
  'thu': 'Thursday',
  'fri': 'Friday',
  'sat': 'Saturday',
  'sun': 'Sunday'
};
const TIME_OPTIONS = [
    { value: '', label: 'Select time' },
    { value: '7:00 AM', label: '7:00 AM' },
    { value: '8:00 AM', label: '8:00 AM' },
    { value: '9:00 AM', label: '9:00 AM' },
    { value: '10:00 AM', label: '10:00 AM' },
    { value: '11:00 AM', label: '11:00 AM' },
    { value: '12:00 PM', label: '12:00 PM' },
    { value: '1:00 PM', label: '1:00 PM' },
    { value: '2:00 PM', label: '2:00 PM' },
    { value: '3:00 PM', label: '3:00 PM' },
    { value: '4:00 PM', label: '4:00 PM' },
    { value: '5:00 PM', label: '5:00 PM' },
    { value: '6:00 PM', label: '6:00 PM' },
    { value: '7:00 PM', label: '7:00 PM' },
    { value: '8:00 PM', label: '8:00 PM' },
    { value: '9:00 PM', label: '9:00 PM' },
    { value: '10:00 PM', label: '10:00 PM' },
    { value: '11:00 PM', label: '11:00 PM' },
    { value: '12:00 AM', label: '12:00 AM' },
    { value: '1:00 AM', label: '1:00 AM' },
    { value: '2:00 AM', label: '2:00 AM' },
    { value: '3:00 AM', label: '3:00 AM' },
    { value: '4:00 AM', label: '4:00 AM' },
    { value: '5:00 AM', label: '5:00 AM' },
    { value: '6:00 AM', label: '6:00 AM' }
];

export default function OperatingHours({ hours, onUpdate }: OperatingHoursProps) {
    // Initialize with provided hours or empty object, ensuring each day has a value
    const [operatingHours, setOperatingHours] = useState<{ [key: string]: string }>(() => {
        const initialHours = { ...hours };
        DAYS.forEach(day => {
            if (!initialHours[day]) {
                initialHours[day] = 'Closed';
            }
        });
        return initialHours;
    });

    const to12Hour = (time24: string) => {
        if (!time24 || time24.toLowerCase() === 'closed') return '';
        try {
            const [hours, minutes] = time24.split(':');
            let hour = parseInt(hours);
            if (isNaN(hour)) return '';
            const ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12;
            hour = hour ? hour : 12;
            return `${hour}:${minutes} ${ampm}`;
        } catch (error) {
            return '';
        }
    };

    const to24Hour = (time12: string) => {
        if (!time12 || time12.toLowerCase() === 'closed') return '';
        try {
            const [time, period] = time12.split(' ');
            let [hours, minutes] = time.split(':');
            let hour = parseInt(hours);
            if (isNaN(hour)) return '';

            if (period === 'PM' && hour !== 12) hour += 12;
            if (period === 'AM' && hour === 12) hour = 0;

            return `${hour.toString().padStart(2, '0')}:${minutes}`;
        } catch (error) {
            return '';
        }
    };

    const parseHours = (timeString: string) => {
        if (!timeString || timeString === 'Closed') return { open: '', close: '' };

        try {
            const parts = timeString.split('-');
            if (parts.length !== 2) return { open: '', close: '' };

            return {
                open: to12Hour(parts[0].trim()),
                close: to12Hour(parts[1].trim())
            };
        } catch (error) {
            console.error('Error parsing hours:', timeString);
            return { open: '', close: '' };
        }
    };

    const handleTimeChange = (day: string, type: 'open' | 'close', value: string) => {
        const currentHours = parseHours(operatingHours[day]);
        let newTimeString: string;

        if (value === 'closed' || (type === 'open' && !value)) {
            newTimeString = 'Closed';
        } else {
            const open = type === 'open' ? to24Hour(value) : to24Hour(currentHours.open);
            const close = type === 'close' ? to24Hour(value) : to24Hour(currentHours.close);

            if (open && close) {
                newTimeString = `${open}-${close}`;
            } else if (type === 'open' && value) {
                // If setting opening time, set a default closing time 8 hours later
                const defaultClose = TIME_OPTIONS.find(t =>
                    to24Hour(t.value) > to24Hour(value)
                )?.value || '5:00 PM';
                newTimeString = `${to24Hour(value)}-${to24Hour(defaultClose)}`;
            } else {
                newTimeString = 'Closed';
            }
        }

        const newHours = {
            ...operatingHours,
            [day]: newTimeString
        };

        setOperatingHours(newHours);
        onUpdate(newHours);
    };

    const toggleClosed = (day: string, isClosed: boolean) => {
        const newHours = {
            ...operatingHours,
            [day]: isClosed ? 'Closed' : '07:00-13:00' // Changed default hours to 7 AM - 1 PM
        };
        setOperatingHours(newHours);
        onUpdate(newHours);
    };

    return (
        <div className="space-y-4">
            {DAYS.map((day) => {
          const times = parseHours(operatingHours[day] || 'Closed')
          const isClosed = operatingHours[day] === 'Closed'

          return (
            <div key={day} className="group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
                <div className="min-w-[120px]">
                  <span className="font-medium text-gray-900">{DAY_NAMES[day]}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <input
                      type="checkbox"
                      checked={isClosed}
                      onChange={(e) => toggleClosed(day, e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      id={`closed-${day}`}
                    />
                    <label 
                      htmlFor={`closed-${day}`} 
                      className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                    >
                      Closed
                    </label>
                  </div>

                  {!isClosed && (
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                      <select
                        value={times.open}
                        onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                        className="block w-32 rounded-md border-gray-300 shadow-sm 
                          focus:border-blue-500 focus:ring-blue-500 text-sm bg-white"
                      >
                        {TIME_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <span className="text-gray-500 px-1">to</span>

                      <select
                        value={times.close}
                        onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                        disabled={!times.open}
                        className="block w-32 rounded-md border-gray-300 shadow-sm 
                          focus:border-blue-500 focus:ring-blue-500 text-sm bg-white
                          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                      >
                        {TIME_OPTIONS.filter(option => (
                          !option.value ||
                          (times.open && to24Hour(option.value) > to24Hour(times.open))
                        )).map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        </div>
    );
}
