import { useEffect, useState } from "react";
import CreateTutorial from "../Components/Create/CreateTutorial";
import CreateWithQuiz from "../Components/Create/CreateWithQuiz";
import Filter from "../Components/Create/Filter";
import TutorialList from "../Components/Create/TutorialList";
import { getAllTutorials } from "../services/Api.service";
import { DataType } from '../utils/types';

const NewCreate = () => {
  const [tutorials, setTutorials] = useState<DataType[]>([]);
  const [filter, setFilter] = useState('newest');

useEffect(() => {
  (async () => {
    try {
      const response = await getAllTutorials();
      const tutorialList = response?.data; 
      console.log(1, tutorialList);
      setTutorials(tutorialList);
    } catch (err) {
      alert(err);
    }
  })();
}, []);

  const handleFilterChange = (childData: string) => {
    setFilter(childData);
  }

  const handleDataFromTutorial = (childData: DataType) => {
    setTutorials((res) => [...res, childData])
  }

  return <div>
    <h2>Create Tutorial</h2>
    <div className="button_line">
      <CreateWithQuiz onData={handleDataFromTutorial} />
      <CreateTutorial onData={handleDataFromTutorial} />
    </div>

    <div className="tutorial_list_line">
      <h2>Tutorial List</h2>
      <Filter onData={handleFilterChange} />
    </div>
    <TutorialList filterName={filter} tutorials={tutorials}/>
  </div>
}

export default NewCreate;