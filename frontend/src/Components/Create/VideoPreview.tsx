import { Box } from '@mui/system';
import { FC } from 'react';

interface VideoPreviewComp {
  showPreview: boolean, 
  videoData: any
}

const VideoPreview: FC<VideoPreviewComp> = ({showPreview, videoData}) => {
  return <div>
    {showPreview && <Box>
      <video className='video_player' controls>
        <source src={URL.createObjectURL(videoData.get('video'))} type="video/mp4" />
      </video>
    </Box>}
  </div>
}

export default VideoPreview;