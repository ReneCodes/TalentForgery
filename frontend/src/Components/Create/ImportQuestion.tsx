import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC, useEffect, useState } from 'react';
import { QuestionType } from '../../utils/types';

const mockQuestions = [
  {
    question: 'Where is steve?',
    options: ['Detroit', 'Michigan', 'Orlando'],
    answer: 'Detroit',
  },
  {
    question: 'Ham or Cheese?',
    options: ['Ham', 'Cheese'],
    answer: 'Cheese',
  },
  {
    question: 'Whats the best drink?',
    options: ['Vodka', 'Beer', 'Cider'],
    answer: 'Cider',
  },
];

const ImportQuestion: FC<{onData: any}> = ({onData}) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [question, setQuestion] = useState<QuestionType | undefined>(undefined);

  useEffect(() => setQuestions(mockQuestions), []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const questionString = event.target.value;
    for (const obj of questions) {
      if (obj.question === questionString) {
        setQuestion(obj);
        onData(obj);
      }
    }
  };

  return (
    <div className="input_box">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Input</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={question?.question}
          label="Import"
          onChange={handleChange}
        >
          {questions.map((question, index) => (
            <MenuItem key={index} value={question.question}>
              {question.question}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ImportQuestion;
