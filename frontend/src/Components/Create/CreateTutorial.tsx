import { ChangeEvent, FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TutorialForm from './TutorialForm';
import VideoPreview from './VideoPreview';
import ImagePreview from './ImagePreview';
import { QuestionType } from '../../utils/types';
import Schedule from './Schedule';

interface FormInfo {
	title: string;
	description: string;
	tags: string[];
	length: string;
}

interface DataType {
	title: string;
	video_url: any;
  image_url: any;
	description: string;
	question_ids: QuestionType[];
	questions_shown: number;
	access_date: string;
	due_date: string;
}

const CreateTutorial: FC<{onData: any}> = ({onData}) => {
  const [open, setOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [videoSubmit, setVideoSubmit] = useState(false);
	const [data, setData] = useState(new FormData());
  const [imageSubmit, setImageSubmit] = useState(false);
	const [imageData, setImageData] = useState(new FormData());
  const [getData, setGetData] = useState(false);
  const [formInfo, setFormInfo] = useState<DataType>({
    title: '',
		video_url: {} as File,
    image_url: {} as File,
		description: '',
		question_ids: [],
		questions_shown: 0,
		access_date: '',
		due_date: '',
	});

  useEffect(() => {
    if(formInfo.access_date) {
      onData(formInfo)
    }
  }, [formInfo]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDataFromForm = (childData: FormInfo) => {
    if (!childData.title || !childData.description) {
      console.log(childData.title,childData.description)
      alert('form information missing');
      setGetData(false);
    } else if (!videoSubmit || !imageSubmit) {
      alert('video and thumbnail is needed');
      setGetData(false);
    } else {
      setFormInfo((res) => {
        return {
          ...res,
          title: childData.title,
          description: childData.description,
          tags: childData.tags,
          video_url: data,
          image_url: imageData
        }
      });
    };
	};

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		
		if (file) {
			const fileSize = file.size / (1024 * 1024);
			if (fileSize > 50) {
				alert('file is to large, the limit is 50mb');
				setVideoSubmit(false);
			} else {
				setVideoSubmit(true);
				const formatedFile = new FormData();
				formatedFile.append('video', file);
				setData(formatedFile);
			}
		} else {
			setVideoSubmit(false);
		}
	};

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(file) {
      const fileSize = file.size / (1024 * 1024)
      if(fileSize > 10) {
        alert('file size to large, the limit is 10mb');
        setImageSubmit(false);
      } else {
        setImageSubmit(true)
        const formattedFile = new FormData();
        formattedFile.append('image', file);
        setImageData(formattedFile);
      }
    } else {
      setImageSubmit(false);
    }
  }

  const handleSubmit = () => {
    setGetData(true);
    handleScheduleOpen();
  }

  const handleScheduleOpen = () => {
    setScheduleOpen(true);
  };

  const handleScheduleClose = () => {
    setScheduleOpen(false);
    handleClose();
  };

  const handleScheduleData = (data: {startDate: string, endDate: string}) => {
    setFormInfo((res) => {
      return {
        ...res,
        access_date: data.startDate,
        due_date: data.endDate,
      }
    });
  }

  return (
    <div>
        <div className='filter_label'>
        <Button variant="contained" onClick={handleClickOpen}>
          Simple Tutorial
        </Button>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <h2 className='dialog'>Simple Tutorial</h2>
        <div className='create_tutorial'>
          <TutorialForm getData={getData} onData={handleDataFromForm} />
          <div>
            <input
              type="file"
              accept="video/**"
              onChange={handleFileUpload}
              className="video_upload"
            />
            <VideoPreview showPreview={videoSubmit} videoData={data} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="video_upload"
            />
            <ImagePreview showPreview={imageSubmit} imageData={imageData} />
          </div>
        </div>
        <div>
          <Button>Cancel</Button>
          <Button onClick={handleSubmit}>Schedule</Button>
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

export default CreateTutorial;