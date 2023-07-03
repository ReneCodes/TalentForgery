import { Card } from "@mui/material";
import { FC, useState } from "react";
import { DataType } from "../../utils/types";
import ImagePreview from "./ImagePreview";
import TutorialInfo from "./TutorialInfo";

const TutorialCard: FC<{tutorial: DataType}> = ({tutorial}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <div>
    <Card className="tutorial_card" onClick={handleClickOpen}>
      <h3>{tutorial.title}</h3>
      <div>
        <ImagePreview showPreview={true} imageData={tutorial.image_url} />
      </div>
    </Card>
    <TutorialInfo open={open} onClose={handleClose} tutorial={tutorial}/>
  </div>
}

export default TutorialCard;