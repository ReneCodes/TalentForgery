import {FC} from 'react';
import Stats from '../Stats/Stats';
import ContactInfo from '../ContactInfo/ContactInfo';
import OutstandingTasks from './OutstandingTasks';
import { contactInfo } from "../../utils/types";
import './EmployeeInfo.css'

interface EmployeeInfoComp {
  contactInfo: contactInfo,
  taskArr: string[],
}

const EmployeeInfo: FC<EmployeeInfoComp> = ({contactInfo, taskArr}) => {
  return <div className='page_center'>
    <div className="employee_info">
    <ContactInfo info={contactInfo}/>

    <h1 className='title'>Stats</h1>
    <Stats />

    <h1 className='title task_title'>Outstanding Tasks</h1>
    <OutstandingTasks taskArr={taskArr} />
    </div>
  </div>
}

export default EmployeeInfo;