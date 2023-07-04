import { Checklist } from "@mui/icons-material";
import { Card, Button } from "@mui/material";
import { FC, useState } from "react";
import { DataType } from "../../utils/types";
import ImagePreview from "./ImagePreview";
import TutorialInfo from "./TutorialInfo";
import TutorialReshedule from "./TutorialReschedule";

const TutorialCard: FC<{tutorial: DataType}> = ({tutorial}) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return <div>
    <Card className="tutorial_card" onClick={handleClickOpen}>
      <h3>{tutorial.title}</h3>
      <div className="tutorial_picture">
        <ImagePreview showPreview={true} imageData={tutorial.image_url || tutorial.video_thumb} />
      </div>
      <div className="check_button">
        <Button onClick={handleClickOpen2}><Checklist /></Button>
        </div>
    </Card>
    <TutorialInfo open={open} onClose={handleClose} tutorial={tutorial}/>
    <TutorialReshedule open={open2} onClose={handleClose2} tutorial={tutorial} />
  </div>
}

export default TutorialCard;