import {FC} from 'react';

const OutstandingTasks: FC<{taskArr: string[]}> = ({taskArr}) => {
  return <ul className="task_list">
    {taskArr.map((task, key) => (
      <li className="task" key={key}>{task}</li>
    ))}
  </ul>
}

export default OutstandingTasks;