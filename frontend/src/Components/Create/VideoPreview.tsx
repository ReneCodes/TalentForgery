import { FC } from 'react';

interface VideoPreviewComp {
  showPreview: boolean, 
  videoData: any
}

const VideoPreview: FC<VideoPreviewComp> = ({showPreview, videoData}) => {
  return <div>
    {showPreview && <video className='video_player' controls>
      <source src={URL.createObjectURL(videoData.get('video'))} type="video/mp4" />
      </video>}
  </div>
}

export default VideoPreview;