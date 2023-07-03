import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, FC, useEffect } from 'react';

interface TutorialFormComp {
  getData: boolean,
  onData: any
}

const TutorialForm: FC<TutorialFormComp> = ({getData, onData}) => {
  const [title, setTitle] = useState('');
  const [description, setDesciption] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAdd = () => {
    if(tag) {
      setTags((res) => [...res, tag]);
      setTag('');
    }
  }

  useEffect(() => {
    if(getData) onData({title, description, tags})
  }, [getData])

  return <div className='form'>
    <TextField 
      id="standard-basic" 
      label="Title" 
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <TextField 
      id="standard-basic" 
      label="Description" 
      multiline
      rows={4} 
      value={description}
      onChange={(e) => setDesciption(e.target.value)}
    />
    <TextField 
      id="standard-basic" 
      label="tags" 
      value={tag}
      onChange={(e) => setTag(e.target.value)}
    />
    <div className='form_add'>
      <Button onClick={handleAdd} variant="contained">Add Tag</Button>
    </div>
    <ul className='options_list'>
      {tags.map((item, index) => (
        <li 
          className='option'
          key={index}>{item}
        </li>
      ))}
    </ul>
  </div>
}

export default TutorialForm;