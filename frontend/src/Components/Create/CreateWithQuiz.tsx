import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TutorialForm from './TutorialForm';
import VideoPreview from './VideoPreview';
import Question from './NewQuestion';
import { QuestionType } from '../../utils/types';
import { TextField } from '@mui/material';

interface FormInfo {
	title: string;
	description: string;
	tags: string[];
}

interface DataType {
	title: string;
	video_url: any;
	description: string;
	question_ids: QuestionType[];
	questions_shown: number;
	access_date: string;
	due_date: string;
}

const CreateWithQuiz = () => {
  const [open, setOpen] = useState(false);
  const [videoSubmit, setVideoSubmit] = useState(false);
	const [data, setData] = useState(new FormData());
  const [questionNumber, setQuestionNumber] = useState(1);
  const [getData, setGetData] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [length, setLength] = useState('');
  const [formInfo, setFormInfo] = useState<DataType>({
    title: '',
		video_url: {} as File,
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

  const handleDataFromForm = (childData: FormInfo) => {
		setFormInfo((res) => {
      return {
        ...res,
        title: childData.title,
        description: childData.description,
        tags: childData.tags,
        length,
      }
    });
    console.log(formInfo)
	};

  const handleDataFromQuestions = (childData: QuestionType) => {
    setQuestions((res) => [...res, childData]);
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
				setData(formatedFile);
			}
		} else {
			setVideoSubmit(false);
		}
	};

  const handleAddQuestion = () => {
    setQuestionNumber((res) => res+1)
  }

  const handleSubmit = () => {
    setGetData(true);
  }

  return (
    <div>
        <div className='filter_label'>
        <Button variant="contained" onClick={handleClickOpen}>
          Tutorial With Quiz
        </Button>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <h2 className='dialog'>Tutorial with Quiz</h2>
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
          </div>
        </div>
        <div className='divider'></div>
        {[...Array(questionNumber)].map((_, index) => (
          <div className='question_card' key={index}><Question getData={getData} onData={handleDataFromQuestions} /></div>
        ))}
        <div>
          <TextField 
            label='quiz length'
            value={length}
            type='number'
            onChange={(e) => setLength(e.target.value)}
          ></TextField>
          <Button onClick={handleAddQuestion}>Add Question</Button>
        </div>
        <div className='divider'></div>
        <div>
          <Button>Cancel</Button>
          <Button onClick={handleSubmit}>Schedule</Button>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateWithQuiz;