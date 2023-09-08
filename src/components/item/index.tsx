import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgHolder from './IMG_PlaceHolder.png'

interface ItemProps {
  img?: string;
  title?: string;
  categories?: string[];
  authors?: string[];
  link: string;
}

function Item({
  img = imgHolder,
  title = '',
  categories = [''],
  authors = [''],
  link
}: ItemProps) {
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate(link);
  }

  return (
    <div className='card bg-body-secondary h-100 ' role='button' onClick={handleClick}>
      <div className='card-img-top h-75 text-center p-3'>
        <img
          src={!isLoading && !isError ? img : imgHolder}
          className='shadow-lg img-fluid'
          alt={title}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
      </div>
      <div className='card-footer'>
        <p className='card-text'>{authors.join(', ')}</p>
        <p className='card-text'><small className='text-muted'>{categories[0]}</small></p>
      </div>
    </div>
  )
}

export default Item;
