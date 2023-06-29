import QuestionList from "../Components/Create/QuestionList";
import TutorialForm from "../Components/Create/TutorialForm";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from "react";
import { QuestionType } from '../utils/types';
import Button from '@mui/material/Button';
import Schedule from "../Components/Create/Schedule";

const mockQuestions = [{
  question: 'Where is steve?',
  options: ['Detroit', 'Michigan', 'Orlando'],
  answer: 'Detroit'
},
{
  question: 'Ham or Cheese?',
  options: ['Ham', 'Cheese'],
  answer: 'Cheese'
},
{
  question: 'Whats the best drink?',
  options: ['Vodka', 'Beer', 'Cider'],
  answer: 'Cider'
}]

interface FormInfo {
  title: string, 
  description: string, 
  tags: string[], 
  length: string
}

interface DataType {
  title: string,
  video_url: string,
  description: string,
  question_ids: QuestionType[],
  questions_shown: number,
  access_date: string,
  due_date: string,
}

interface schedule {
  startTime: string,
  endTime: string,
  startDate: string,
  endDate: string
}

const Create = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selected, setSelected] = useState('');
  const [getData, setGetData] = useState(false);
  const [renderForm, setRenderForm] = useState(false);
  const [formInfo, setFormInfo] = useState<FormInfo>({
    title: '',
    description: '',
    tags: [],
    length: '',
  });
  const [questionsForm, setQuestionsForm] = useState<QuestionType[]>([]);
  const [data, setData] = useState<DataType>({
    title: '',
    video_url: '',
    description: '',
    question_ids: [],
    questions_shown: 0,
    access_date: '',
    due_date: '',
  })
  
  useEffect(() => {
    setQuestions(mockQuestions)
  }, [])

  const handleSubmit = () => {
    setGetData(true);
  }

  useEffect(() => {
    if(getData) {
      const questionsShown = parseInt(formInfo.length);
      if (!formInfo.title || !formInfo.description || !formInfo.length) {
        alert('form information missing');
        setGetData(false);
      } else if (/[a-zA-Z]/.test(formInfo.length)) {
        alert('length must be a number');
        setGetData(false);
      } else if (questionsShown > questionsForm.length) {
        alert('must have more or equal questions to the length');
        setGetData(false);
      } else {
        setData({
          title: formInfo.title,
          video_url: '',
          description: formInfo.description,
          question_ids: questionsForm,
          questions_shown: questionsShown,
          access_date: '',
          due_date: '',
        })
        setRenderForm(true);
      }
    }
  }, [questionsForm, formInfo])

  useEffect(() => {
    if(getData) console.log(data);
  }, [data])

  const handleDataFromForm = (childData: FormInfo) => {
    setFormInfo(childData);
  }

  const handleDataFromQuestions = (childData: QuestionType[]) => {
    setQuestionsForm(childData);
  }

  const handleDataFromSchedule = (childData: schedule) => {
    setData((prevState: DataType) => {
      return {
        ...prevState,
        access_date: `${childData.startDate}`,
        due_date: `${childData.endDate}`,
      };
    });
  };

  return (
    <div>
      {!renderForm ? (
        <>
          <TutorialForm getData={getData} onData={handleDataFromForm} />
          <InputLabel className="import_label" id="label">Import Questions</InputLabel>
          <Select
            onChange={(e) => setSelected(e.target.value as string)}
            labelId="label"
            className="dropdown"
          >
            {questions.map((question, index) => (
              <MenuItem key={index} value={index}>
                {question.question}
              </MenuItem>
            ))}
          </Select>
          <QuestionList
            imported={questions[parseInt(selected)]}
            //@ts-ignore
            getData={getData}
            onData={handleDataFromQuestions}
          />
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </>
      ) : (
        //@ts-ignore
        <Schedule onData={handleDataFromSchedule} />
      )}
    </div>
  );
}
export default Create;