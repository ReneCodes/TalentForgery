import QuestionList from "../Components/Create/QuestionList";
import TutorialForm from "../Components/Create/TutorialForm";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from "react";
import { QuestionType } from '../utils/types';

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

const Create = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setQuestions(mockQuestions)
  }, [])

  return (
    <div>
      <TutorialForm />
      <InputLabel id="label">Import Questions</InputLabel>
      <Select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        labelId="label"
        className="dropdown"
      >
        <MenuItem value="">
        <InputLabel id="dropdown-label">Import Questions</InputLabel>
        </MenuItem>
        {questions.map((question, index) => (
          <MenuItem key={index} value={index}>
            {question.question}
          </MenuItem>
        ))}
      </Select>
      <QuestionList />
    </div>
  );
}
export default Create;