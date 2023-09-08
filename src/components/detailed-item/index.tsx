import { useState } from 'react';
import DOMPurify from 'dompurify';
import imgHolder from './IMG_PlaceHolder.png';

interface DetailedItemProps {
  img?: string;
  title?: string;
  categories?: string[];
  authors?: string[];
  description?: string;
}

function DetailedItem({
  img = imgHolder,
  title = '',
  categories = [''],
  authors = [''],
  description = ''
}: DetailedItemProps) {
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLoad = async () => {
    setLoading(false);
    setIsError(false);
  };

  const handleError = async () => {
    setLoading(false);
    setIsError(true);
  };

  const createMarkup = () => {
    if (description)
      return {__html: DOMPurify.sanitize(description)};
  }

  return (
    <div className='container-sm'>
      <div className='card mb-3'>
        <div className='row g-0'>
        <div className='col-md-4 text-center p-3 bg-body-secondary'>
          <img 
            src={!isLoading && !isError ? img : imgHolder}
            className='shadow-lg img-fluid'
            alt={title}
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text my-3' dangerouslySetInnerHTML={createMarkup()}></p>
            <p className='card-text'><small className='text-body-secondary'>{authors?.join(', ')}</small></p>
            <p className='card-text'><small className='text-body-secondary'>{categories?.join(', ')}</small></p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default DetailedItem;
