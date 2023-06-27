import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

const TutorialForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDesciption] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [length, setLength] = useState('');

  const handleAdd = () => {
    setTags((res) => [...res, tag]);
    setTag('');
    console.log(tags);
  }

  return <div className='form'>
    <TextField 
      id="standard-basic" 
      label="Title" 
      variant="standard" 
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <TextField 
      id="standard-basic" 
      label="Description" 
      variant="standard" 
      value={description}
      onChange={(e) => setDesciption(e.target.value)}
    />
    <TextField 
      id="standard-basic" 
      label="tags" 
      variant="standard" 
      value={tag}
      onChange={(e) => setTag(e.target.value)}
    />
    <Button onClick={handleAdd} variant="contained">Add</Button>
    <ul className='options_list'>
      {tags.map((item, index) => (
        <li 
          className='option'
          key={index}>{item}
        </li>
      ))}
    </ul>
    <TextField 
      id="standard-basic" 
      label="Test Length" 
      variant="standard" 
      value={length}
      onChange={(e) => setLength(e.target.value)}
    />
  </div>
}

export default TutorialForm;