import { Button, Dialog, DialogTitle, Divider } from "@mui/material";
import { FC, useState} from "react";
import { DataType } from "../../utils/types";
import QuestionList from "./NewQuestionList";
import Schedule from "./Schedule";
import VideoPreview from "./VideoPreview";

interface TutorialInfoProps {
  open: boolean;
  onClose: () => void
  tutorial: DataType;
}

const TutorialReshedule: FC<TutorialInfoProps> = ({open, onClose, tutorial}) => {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [formInfo, setFormInfo] = useState(tutorial);

  const handleScheduleOpen = () => {
    setScheduleOpen(true);
  };

  const handleScheduleClose = () => {
    setScheduleOpen(false);
    onClose();
  };

  const handleScheduleData = (data: {startDate: string, endDate: string}) => {
    setFormInfo((res) => {
      return {
        ...res,
        access_date: data.startDate,
        due_date: data.endDate,
      }
    });
    console.log(formInfo);
  }

  return (
    <div>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Tutorial Reshedule</DialogTitle>
        <div className="info_box">
          <div className="info_info">
            <h2>{tutorial.title}</h2>
            <h3>{tutorial.description}</h3>
          </div>
          <VideoPreview showPreview={true} videoData={tutorial.video_url} />
        </div>
        {tutorial.question_ids.length > 0 && <div>
          <Divider />
          <QuestionList questions={tutorial.question_ids} />
          </div>
        }
        <Divider />
        <div className='quiz_line schedule_line'>
          <Button variant='contained' onClick={onClose}>Cancel</Button>
          <Button variant='contained' onClick={handleScheduleOpen}>Schedule</Button>
        </div>
      </Dialog>
      <Schedule 
        open={scheduleOpen}  
        onClose={handleScheduleClose}
        onData={handleScheduleData}
      />
    </div>
  );
}

export default TutorialReshedule;