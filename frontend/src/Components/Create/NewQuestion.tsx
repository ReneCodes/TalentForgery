import { Button } from "@mui/base";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";

const Question = () => {
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');

  const handleAnswer = (e: SyntheticEvent<Element, Event>) => {
		const target = e.target as HTMLInputElement;
		setAnswer(target.value as string);
    console.log(answer);
	};

  const handleAdd = () => {
    setOptions((res) => [...res, option]);
  }

  return <div className="question">
    <div>
    <TextField 
      label="Question" 
      variant="outlined" 
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
    <button>X</button>
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
      label="Question" 
      variant="outlined" 
      value={option}
      onChange={(e) => setOption(e.target.value)}
    />
    <Button onClick={handleAdd}>Add option</ Button>
  </div>
}

export default Question;