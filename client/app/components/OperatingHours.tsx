import React, { useState } from 'react';

interface OperatingHoursProps {
  hours: {
    [key: string]: string;
  };
  onUpdate: (hours: { [key: string]: string }) => void;
}

const days = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'web', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
];

const OperatingHours: React.FC<OperatingHoursProps> = ({ hours, onUpdate }) => {
  const [localHours, setLocalHours] = useState(hours);

  const handleTimeChange = (day: string, value: string) => {
    const updatedHours = { ...localHours, [day]: value };
    setLocalHours(updatedHours);
    onUpdate(updatedHours);
  };

  const handleStatusChange = (day: string, isClosed: boolean) => {
    const updatedHours = {
      ...localHours,
      [day]: isClosed ? 'Closed' : '09:00-17:00'
    };
    setLocalHours(updatedHours);
    onUpdate(updatedHours);
  };

  return (
    <div className="space-y-4">
      {days.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-4">
          <div className="w-32">
            <span className="font-medium">{label}</span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={localHours[key]?.toLowerCase() === 'closed' ? 'closed' : 'open'}
              onChange={(e) => handleStatusChange(key, e.target.value === 'closed')}
              className="border rounded-lg px-3 py-2"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            
            {localHours[key]?.toLowerCase() !== 'closed' && (
              <input
                type="text"
                value={localHours[key] || ''}
                onChange={(e) => handleTimeChange(key, e.target.value)}
                placeholder="09:00-17:00"
                className="border rounded-lg px-3 py-2"
              />
            )}
          </div>
        </div>
      ))}
      <p className="text-sm text-gray-500 mt-2">
        Format: HH:MM-HH:MM (e.g., 09:00-17:00)
      </p>
    </div>
  );
};

export default OperatingHours;
