import { Button, Dialog, DialogTitle, Divider } from "@mui/material";
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
        <div className="info_box">
          <div className="info_info">
            <h2>{tutorial.title}</h2>
            <h3>{tutorial.description}</h3>
          </div>
          <VideoPreview showPreview={true} videoData={tutorial.video_url} />
        </div>
        <Divider />
        <div className="info_close">
          <Button variant="contained" onClick={onClose}>Close</Button>
        </div>
      </Dialog>
    </div>
  );
}

export default TutorialInfo;
