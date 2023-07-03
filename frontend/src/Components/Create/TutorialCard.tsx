import { Card } from "@mui/material";
import { FC } from "react";
import { DataType } from "../../utils/types";
import ImagePreview from "./ImagePreview";

const TutorialCard: FC<{tutorial: DataType}> = ({tutorial}) => {

  return <Card className="tutorial_card">
    <h3>{tutorial.title}</h3>
    <div className="image_card">
      <ImagePreview showPreview={true} imageData={tutorial.image_url} />
    </div>
  </Card>
}

export default TutorialCard;