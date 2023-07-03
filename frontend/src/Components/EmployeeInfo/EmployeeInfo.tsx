import {FC} from 'react';
import Stats from '../Stats/Stats';
import ContactInfo from '../ContactInfo/ContactInfo';
import OutstandingTasks from './OutstandingTasks';
import {UpdateProfile} from '../../@types/Types';
import './EmployeeInfo.css';

interface EmployeeInfoComp {
	contactInfo: UpdateProfile;
	taskArr: string[];
}

const EmployeeInfo: FC<EmployeeInfoComp> = ({contactInfo, taskArr}) => {
	return (
		<div className="page_center">
			<div className="employee_info">
				<ContactInfo />

				<h1 className="contact_title">Stats</h1>
				<Stats />

				<h1 className="task_title">Outstanding Tasks</h1>
				<OutstandingTasks taskArr={taskArr} />
			</div>
		</div>
	);
};

export default EmployeeInfo;
