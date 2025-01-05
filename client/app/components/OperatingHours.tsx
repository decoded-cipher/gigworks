import React, { useState } from 'react';

interface OperatingHoursProps {
  hours: { [key: string]: string };
  onUpdate: (hours: { [key: string]: string }) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_OPTIONS = [
  { value: '', label: 'Select time' },
  { value: '7:00 AM', label: '7:00 AM' },
  { value: '8:00 AM', label: '8:00 AM' },
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM' },
  { value: '1:00 PM', label: '1:00 PM' },
];

export default function OperatingHours({ hours, onUpdate }: OperatingHoursProps) {
  // Initialize with provided hours or empty object, ensuring each day has a value
  const [operatingHours, setOperatingHours] = useState<{[key: string]: string}>(() => {
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
        const times = parseHours(operatingHours[day] || 'Closed');
        const isClosed = operatingHours[day] === 'Closed';
        
        return (
          <div key={day} className="flex items-center gap-4">
            <div className="w-32">
              <span className="font-medium">{day}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isClosed}
                onChange={(e) => toggleClosed(day, e.target.checked)}
                className="h-4 w-4 cursor-pointer"
                id={`closed-${day}`}
              />
              <label htmlFor={`closed-${day}`} className="text-sm cursor-pointer">
                Closed
              </label>
            </div>

            {!isClosed && (
              <>
                <select
                  className="p-2 border rounded"
                  value={times.open}
                  onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                >
                  {TIME_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <span>to</span>

                <select
                  className="p-2 border rounded"
                  value={times.close}
                  onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                  disabled={!times.open}
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
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
