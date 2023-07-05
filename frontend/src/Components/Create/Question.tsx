import { Card, FormControlLabel, Radio, RadioGroup, TextField, Button } from "@mui/material";
import { SyntheticEvent, useState, FC, useEffect } from "react";
import { QuestionType } from "../../utils/types";

interface QuestionComp {
  getData: boolean,
  onData: (childData: QuestionType) => void
}

const Question: FC<QuestionComp> = ({getData, onData}) => {
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [show, setShow] = useState(true);

  const handleAnswer = (e: SyntheticEvent<Element, Event>) => {
		const target = e.target as HTMLInputElement;
		setAnswer(target.value as string);
	};

  const handleDelete = () => {
    setShow(false);
    setQuestion('');
    setAnswer('');
  }

  const handleAdd = () => {
    if(option) {
      setOptions((res) => [...res, option]);
      setOption('');
    }
  }

  useEffect(() => {
    if(getData) onData({question, options, answer});
  }, [getData])

  return <>
    {show && 
      <Card sx={{ maxWidth: 400, padding: 2 }} className="question">
        <div className="question_add">
        <TextField 
          label="Question" 
          variant="outlined" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button className="X" variant="contained" onClick={handleDelete}>X</Button>
        </div>
        <RadioGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              label={option}
              control={<Radio className='checkbox' />}
              name="optionGroup"
              onChange={handleAnswer}
            />
          ))}
        </RadioGroup>
        <div className="question_options">
          <TextField 
            label="Options" 
            variant="outlined" 
            value={option}
            onChange={(e) => setOption(e.target.value)}
          />
          <Button variant="contained" onClick={handleAdd}>Add option</ Button>
        </div>
      </Card>
    }
  </>
}

export default Question;