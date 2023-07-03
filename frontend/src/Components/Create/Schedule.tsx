import { FC, useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface ScheduleComp {
  onData: any;
  open: boolean;
  onClose: () => void;
}

const Schedule: FC<ScheduleComp> = ({ onData, open, onClose }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleClick = () => {
    const newDate = new Date();
    if (!startDate) {
      alert('you must provide a start date');
    } else if (!endDate) {
      alert('you must provide an end date');
    } else if (startDate && endDate && startDate > endDate) {
      alert('start date must be before end date');
    } else if (endDate < newDate) {
      alert('end date must be in the future');
    } else {
      onData({
        startDate,
        endDate,
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Card className="schedule" variant="outlined">
        <DialogTitle>Create Tutorial</DialogTitle>
        <div className="calendars">
          <div>
						<h2>Begin</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={startDate}
                onChange={(value) => setStartDate(value)}
                data-testid="date-picker"
                className="date_picker"
              />
            </LocalizationProvider>
          </div>
          <div>
						<h2>End</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={endDate}
                onChange={(value) => setEndDate(value)}
                data-testid="date-picker"
                className="date_picker"
              />
            </LocalizationProvider>
          </div>
          <Button variant="contained" onClick={handleClick}>
            Create
          </Button>
        </div>
      </Card>
    </Dialog>
  );
};

export default Schedule;

