import { useState } from "react";
import CreateWithQuiz from "../Components/Create/CreateWithQuiz";
import Filter from "../Components/Create/Filter";

const NewCreate = () => {
  const [filter, setFilter] = useState('newest');

  const handleFilterChange = (childData: string) => {
    setFilter(childData);
    console.log(filter);
  }
  
  return <div>
    <h2>Create Tutorial</h2>
    <div>
      <CreateWithQuiz />
    </div>

    <div className="tutorial_list_line">
      <h2>Tutorial List</h2>
      <Filter onData={handleFilterChange} />
    </div>
  </div>
}

export default NewCreate;