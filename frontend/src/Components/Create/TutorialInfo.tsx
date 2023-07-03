import { Dialog, DialogTitle } from "@mui/material";
import { FC} from "react";
import { DataType } from "../../utils/types";
import VideoPreview from "./VideoPreview";

interface TutorialInfoProps {
  open: boolean;
  onClose: () => void
  tutorial: DataType;
}

const TutorialInfo: FC<TutorialInfoProps> = ({open, onClose, tutorial}) => {
  return (
    <div>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Genral Info Tutorial</DialogTitle>
        <div>
          <h2>{tutorial.title}</h2>
          <h3>{tutorial.description}</h3>
        </div>
        <VideoPreview showPreview={true} videoData={tutorial.video_url} />
      </Dialog>
    </div>
  );
}

export default TutorialInfo;
