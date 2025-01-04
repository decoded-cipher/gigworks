import React, { useState } from 'react';

interface OperatingHoursProps {
  hours: { [key: string]: string };
  onUpdate: (newHours: { [key: string]: string }) => void;
}

const OperatingHours: React.FC<OperatingHoursProps> = ({ hours, onUpdate }) => {
  const daysOfWeek = [
    { id: 'mon', label: 'Monday' },
    { id: 'tue', label: 'Tuesday' },
    { id: 'wed', label: 'Wednesday' },
    { id: 'thu', label: 'Thursday' },
    { id: 'fri', label: 'Friday' },
    { id: 'sat', label: 'Saturday' },
    { id: 'sun', label: 'Sunday' },
  ];

  const handleTimeChange = (day: string, newTime: string) => {
    onUpdate({
      ...hours,
      [day]: newTime
    });
  };

  return (
    <div className="space-y-4">
      {daysOfWeek.map(({ id, label }) => (
        <div key={id} className="grid grid-cols-3 gap-4 items-center">
          <label className="text-sm font-medium">{label}</label>
          <div className="col-span-2 flex items-center gap-2">
            <select
              value={hours[id]?.split('-')[0] || ''}
              onChange={(e) => {
                const endTime = hours[id]?.split('-')[1] || '18:00';
                handleTimeChange(id, `${e.target.value}-${endTime}`);
              }}
              className="p-2 border rounded-lg"
            >
              {[...Array(24)].map((_, i) => (
                <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                  {`${i.toString().padStart(2, '0')}:00`}
                </option>
              ))}
            </select>
            <span>to</span>
            <select
              value={hours[id]?.split('-')[1] || ''}
              onChange={(e) => {
                const startTime = hours[id]?.split('-')[0] || '09:00';
                handleTimeChange(id, `${startTime}-${e.target.value}`);
              }}
              className="p-2 border rounded-lg"
            >
              {[...Array(24)].map((_, i) => (
                <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                  {`${i.toString().padStart(2, '0')}:00`}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OperatingHours;
