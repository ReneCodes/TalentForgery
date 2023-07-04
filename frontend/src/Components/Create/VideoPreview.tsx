import { FC } from 'react';

interface VideoPreviewComp {
  showPreview: boolean, 
  videoData: any
}

const VideoPreview: FC<VideoPreviewComp> = ({showPreview, videoData}) => {
  return <>
  {typeof videoData === 'string' ? (
    <div>
      <video className='video_player' controls>
        <source src={`../../../../server/videos/${videoData}`} type="video/mp4" />
      </video>
    </div>
  ) : (
  <div>
    {showPreview && <video className='video_player' controls>
      <source src={URL.createObjectURL(videoData.get('video'))} type="video/mp4" />
      </video>}
  </div>
  )}
  </>
}

export default VideoPreview;