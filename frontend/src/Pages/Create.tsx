import QuestionList from "../Components/Create/QuestionList";
import TutorialForm from "../Components/Create/TutorialForm";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from "react";
import { QuestionType } from '../utils/types';
import Button from '@mui/material/Button';

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

const Create = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selected, setSelected] = useState('');
  const [getData, setGetData] = useState(false);
  const [formInfo, setFormInfo] = useState<FormInfo>({
    title: '',
    description: '',
    tags: [],
    length: '',
  });
  const [questionsForm, setQuestionsForm] = useState<QuestionType[]>([]);
  
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
      } else if (typeof questionsShown !== 'number' && !isNaN(questionsShown)) {
        alert('length must be a number');
      } else if (questionsShown > questionsForm.length) {
        alert('must have more or equal questions to the length');
      } else {
        const tutorialData = {
          title: formInfo.title,
          video_url: '',
          description: formInfo.description,
          question_ids: questionsForm,
          questions_shown: questionsShown,
          access_date: '',
          due_date: '',
        }
        console.log(tutorialData);
      }
    }
  }, [questionsForm, formInfo])

  const handleDataFromForm = (childData: FormInfo) => {
    setFormInfo(childData);
  }

  const handleDataFromQuestions = (childData: QuestionType[]) => {
    setQuestionsForm(childData);
  }

  return (
    <div>
      <TutorialForm getData={getData} onData={handleDataFromForm}/>
      <InputLabel id="label">Import Questions</InputLabel>
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
      <QuestionList imported={questions[parseInt(selected)]} getData={getData} onData={handleDataFromQuestions} />
      <Button onClick={handleSubmit} variant="contained">Submit</Button>
    </div>
  );
}
export default Create;