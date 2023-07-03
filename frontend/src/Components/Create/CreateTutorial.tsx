import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TutorialForm from './TutorialForm';
import VideoPreview from './VideoPreview';

interface FormInfo {
	title: string;
	description: string;
	tags: string[];
	length: string;
}

const CreateTutorial = () => {
  const [open, setOpen] = useState(false);
  const [videoSubmit, setVideoSubmit] = useState(false);
	const [data, setData] = useState(new FormData());
  const [formInfo, setFormInfo] = useState<FormInfo>({
		title: '',
		description: '',
		tags: [],
		length: '',
	});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDataFromForm = (childData: FormInfo) => {
		setFormInfo(childData);
    console.log(formInfo)
	};

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		
		if (file) {
			const fileSize = file.size / (1024 * 1024);
			if (fileSize > 50) {
				alert('file is to large, the limit is 50mb');
				setVideoSubmit(false);
			} else {
				setVideoSubmit(true);
				const formatedFile = new FormData();
				formatedFile.append('video', file);
				setData(formatedFile);
			}
		} else {
			setVideoSubmit(false);
		}
	};

  return (
    <div>
        <div className='filter_label'>
        <Button variant="contained" onClick={handleClickOpen}>
          Simple Tutorial
        </Button>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <h2 className='dialog'>Simple Tutorial</h2>
        <div className='create_tutorial'>
          <TutorialForm getData={false} onData={handleDataFromForm} />
          <div>
            <input
              type="file"
              accept="video/**"
              onChange={handleFileUpload}
              className="video_upload"
            />
            <VideoPreview showPreview={videoSubmit} videoData={data} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateTutorial;