import {FC, useState} from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';


interface ScheduleComp {
	onData: any;
}

const Schedule: FC<ScheduleComp> = ({onData}) => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleClick = () => {
    if (!startDate) {
      alert('you must provide an start date');
    } else if (!endDate) {
      alert('you must provide an end date');
    } else if (startDate && endDate && startDate > endDate) {
      alert('startdate must be before end date');
    } else {
      onData({
        startDate,
        endDate,
      });
    }
	};

	return (
		<div className="popup">
			<Card
				className="schedule"
				variant="outlined">
				<div className="calendars">
					<h2>Create Tutorial</h2>
					<div>
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
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								value={endDate}
								onChange={(value) => setEndDate(value)}
								data-testid="date-picker"
								className="date_picker"
							/>
						</LocalizationProvider>
					</div>
					<Button
						variant="contained"
						onClick={handleClick}>
						Create
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default Schedule;
