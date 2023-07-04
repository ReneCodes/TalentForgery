import { FC } from 'react';

interface ImagePreviewComp {
  showPreview: boolean,
  imageData: any
}

const ImagePreview: FC<ImagePreviewComp> = ({ showPreview, imageData }) => {
  return <>
  {typeof imageData === 'string' ? (
    <div>
      <img className="image_preview" src={`http://localhost:3001/images/thumbnails/${imageData}`} alt="Image Preview" />
    </div>
  ) : (
    <div>
      {showPreview && (
        <img className="image_preview" src={URL.createObjectURL(imageData.get('image'))} alt="Image Preview" />
      )}
    </div>
  )}
  </>
}

export default ImagePreview;