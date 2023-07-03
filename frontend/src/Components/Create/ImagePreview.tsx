import { FC } from 'react';

interface ImagePreviewComp {
  showPreview: boolean,
  imageData: any
}

const ImagePreview: FC<ImagePreviewComp> = ({ showPreview, imageData }) => {
  return (
    <div>
      {showPreview && (
        <img className="image_preview" src={URL.createObjectURL(imageData.get('image'))} alt="Image Preview" />
      )}
    </div>
  );
}

export default ImagePreview;