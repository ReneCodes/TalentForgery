import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {FC, useState, MouseEvent, FormEvent } from 'react';



const AddQuestion:FC<{onData: any}> = ({onData}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOptions((res) => [...res, option]);
    setOption('');
  }

  const handleSelect = (thing: string) => {
    setAnswer(thing)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!question || options.length === 0 || !answer) {
      alert('do the shit properly');  
    } else {
      onData({question, options, answer});
    }
  }

  return <form onSubmit={handleSubmit} className='add_question'>
    <TextField 
      id="standard-basic" 
      label="Question" 
      variant="standard" 
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
    <div>
      <TextField 
        id="standard-basic" 
        label="Option" 
        variant="standard" 
        value={option}
        onChange={(e) => setOption(e.target.value)}
        className='option_input'
      />
      <button className='add_button' onClick={handleAdd}>Add</button>
    </div>
    <ul className='options_list'>
      {options.map((item, index) => (
        <li 
          className={answer === item ? 'selected' : 'option'}
          onClick={() => handleSelect(item)} 
          key={index}>{item}
        </li>
      ))}
    </ul>
    <Button type='submit' variant="contained">Contained</Button>
  </form>
}

export default AddQuestion;