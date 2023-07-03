import { FC } from "react";
import { DataType } from "../../utils/types";
import ImagePreview from "./ImagePreview";

const TutorialCard: FC<{tutorial: DataType}> = ({tutorial}) => {

  return <div>
    <h3>{tutorial.title}</h3>
    <ImagePreview showPreview={true} imageData={tutorial.image_url} />
  </div>
}

export default TutorialCard;