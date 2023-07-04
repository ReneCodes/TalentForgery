import { FC, useEffect, useState } from "react";
import { DataType } from "../../utils/types";
import TutorialCard from "./TutorialCard";
import filter from './filterFunction';

const TutorialList: FC<{tutorials: DataType[], filterName: string}> = ({tutorials, filterName}) => {
  const [tutorialList, setTutorialList] = useState<DataType[]>([]);


  useEffect(() => {
    const filteredList = filter(filterName, tutorials);
    setTutorialList(filteredList);
  }, [tutorials, filterName]);

  useEffect(() => console.log(tutorialList), [tutorialList]);

  return <>
    {tutorialList.map((tutorial, key) => (
      <div key={key}><TutorialCard tutorial={tutorial}/></div>
    ))}
  </>
}

export default TutorialList;