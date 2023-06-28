import { useState, FC } from "react";
import Card from "@mui/material/Card";
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import { Value } from "react-time-picker/dist/cjs/shared/types";
import 'react-time-picker/dist/TimePicker.css';
import Button from "@mui/material/Button";

interface ScheduleComp {
  onData: any
}

const Schedule: FC<ScheduleComp> = ({onData}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Value>('00:00');
  const [endTime, setEndTime] = useState<Value>('00:00');

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  const handleStartTimeChange = (time: Value) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: Value) => {
    setEndTime(time);
  };

  const handleClick = () => {
    onData({
      startDate, endDate, startTime, endTime
    })
  }

  return <div className="popup">
        <Card variant="outlined">
          <div className="calendars">
            <h2>Create Tutorial</h2>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="calendar"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
              minDate={startDate}
              className="calendar"
            />
            <h2>Time</h2>
            <div>
              <TimePicker
                onChange={handleStartTimeChange}
                value={startTime}
                className="timePicker"
                clearIcon={null}
                clockIcon={null}
                format="HH:mm"
                disableClock
              />
              <TimePicker
                onChange={handleEndTimeChange}
                value={endTime}
                className="timePicker"
                clearIcon={null}
                clockIcon={null}
                format="HH:mm"
                disableClock
              />
            </div>
            <Button variant="contained" onClick={handleClick}>
              Create
            </Button>
          </div>
        </Card>
    </div>
}

export default Schedule;