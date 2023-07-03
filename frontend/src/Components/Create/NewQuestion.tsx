import { Card, FormControlLabel, Radio, RadioGroup, TextField, Button } from "@mui/material";
import { SyntheticEvent, useState, FC, useEffect } from "react";

interface QuestionComp {
  getData: boolean,
  onData: any
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
  }

  const handleAdd = () => {
    setOptions((res) => [...res, option]);
    setOption('');
  }

  useEffect(() => {
    if(getData) onData({question, options, answer});
  }, [getData])

  return <>
    {show && 
      <Card sx={{ maxWidth: 400, padding: 2 }} className="question">
        <div>
        <TextField 
          label="Question" 
          variant="outlined" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={handleDelete}>X</Button>
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
        <TextField 
          label="Options" 
          variant="outlined" 
          value={option}
          onChange={(e) => setOption(e.target.value)}
        />
        <Button onClick={handleAdd}>Add option</ Button>
      </Card>
    }
  </>
}

export default Question;