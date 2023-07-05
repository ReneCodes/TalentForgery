import TextField from '@mui/material/TextField';
import { useState, FC, useEffect } from 'react';
import { FormInfo } from '../../utils/types';
import { TutorialTagStore } from '../../utils/zustand.store';
import TagsList from './TagsList';

interface TutorialFormComp {
  getData: boolean,
  onData: (childData: FormInfo) => void
}

const TutorialForm: FC<TutorialFormComp> = ({getData, onData}) => {
  const [title, setTitle] = useState('');
  const [description, setDesciption] = useState('');

  const { selctedTags } = TutorialTagStore()

  useEffect(() => {
    if(getData) onData({title, description, tags: selctedTags})
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
    <TagsList />
    <div className='form_add'>
    </div>
  </div>
}

export default TutorialForm;