import { FC } from "react";
import { DataType } from "../../utils/types";
import TutorialCard from "./TutorialCard";

const TutorialList: FC<{tutorials: DataType[]}> = ({tutorials}) => {

  return <>
    {tutorials.map((tutorial, key) => (
      <div key={key}><TutorialCard tutorial={tutorial}/></div>
    ))}
  </>
}

export default TutorialList;