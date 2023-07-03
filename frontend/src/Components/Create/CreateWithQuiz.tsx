import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TutorialForm from './TutorialForm';
import VideoPreview from './VideoPreview';
import Question from './NewQuestion';
import { QuestionType } from '../../utils/types';
import { Divider, TextField } from '@mui/material';
import Schedule from './Schedule';
import ImagePreview from './ImagePreview';

interface FormInfo {
	title: string;
	description: string;
	tags: string[];
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

const CreateWithQuiz = () => {
  const [open, setOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [videoSubmit, setVideoSubmit] = useState(false);
	const [videoData, setVideoData] = useState(new FormData());
  const [imageSubmit, setImageSubmit] = useState(false);
	const [imageData, setImageData] = useState(new FormData());
  const [questionNumber, setQuestionNumber] = useState(1);
  const [getData, setGetData] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [length, setLength] = useState('');
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

  useEffect(() => console.log(formInfo), [formInfo]);
  useEffect(() => console.log(questions), [questions]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScheduleOpen = () => {
    setScheduleOpen(true);
  };

  const handleScheduleClose = () => {
    setScheduleOpen(false);
    handleClose();
  };

  const handleScheduleData = (data: {startDate: string, endDate: string}) => {
    if (parseInt(length) > questions.length) {
      alert('too few questions')
    } else {
      setFormInfo((res) => {
        return {
          ...res,
          access_date: data.startDate,
          due_date: data.endDate,
          question_ids: questions
        }
      });
    }
  };

  const handleDataFromForm = (childData: FormInfo) => {
    if (!childData.title || !childData.description || !length) {
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
          length,
          video_url: videoData,
          image_url: imageData
        }
      });
    }
	};

  const handleDataFromQuestions = (childData: QuestionType) => {
    if (childData.question && childData.answer && childData.options.length !== 0) {
      setQuestions((res) => [...res, childData]);
    }
  }

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
				setVideoData(formatedFile);
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

  const handleAddQuestion = () => {
    setQuestionNumber((res) => res+1)
  }

  const handleSubmit = () => {
    setGetData(true);
    handleScheduleOpen();
  }

  return (
    <div>
        <div className='filter_label'>
        <Button variant="contained" onClick={handleClickOpen}>
          Tutorial With Quiz
        </Button>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <div className='tutorial_title'>
          <h2>Tutorial with Quiz</h2>
        </div>
        <div className='create_tutorial'>
          <TutorialForm getData={getData} onData={handleDataFromForm} />
          <div>
            <input
              type="file"
              accept="video/**"
              onChange={handleFileUpload}
              className="video_upload"
            />
            <VideoPreview showPreview={videoSubmit} videoData={videoData} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="video_upload"
            />
            <ImagePreview showPreview={imageSubmit} imageData={imageData} />
          </div>
        </div>
        <Divider />
        {[...Array(questionNumber)].map((_, index) => (
          <div className='question_card' key={index}><Question getData={getData} onData={handleDataFromQuestions} /></div>
        ))}
        <div className='quiz_line'>
          <TextField 
            label='quiz length'
            value={length}
            type='number'
            onChange={(e) => setLength(e.target.value)}
          ></TextField>
          <Button variant="contained" onClick={handleAddQuestion}>Add Question</Button>
        </div>
        <Divider />
        <div className='quiz_line schedule_line'>
          <Button variant="contained">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Schedule</Button>
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

export default CreateWithQuiz;