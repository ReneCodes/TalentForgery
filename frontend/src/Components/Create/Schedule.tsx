import { FC, useState } from "react";
import Card from "@mui/material/Card";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import Button from "@mui/material/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface ScheduleComp {
  onData: any
}

const Schedule: FC<ScheduleComp> = ({onData}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleClick = () => {
    onData({
      startDate, endDate
    })
  }

  return <div className="popup">
        <Card className="schedule" variant="outlined">
          <div className="calendars">
            <h2>Create Tutorial</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                value={startDate}
                onChange={(value) => setStartDate(value)}
                data-testid="date-picker"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                value={endDate}
                onChange={(value) => setEndDate(value)}
                data-testid="date-picker"
              />
            </LocalizationProvider>
            <Button variant="contained" onClick={handleClick}>
              Create
            </Button>
          </div>
        </Card>
    </div>
}

export default Schedule;