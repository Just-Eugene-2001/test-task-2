import { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hook';
import { loadBook } from '../../redux/booksSlice';
import { RootState } from '../../redux/store';

import Header from '../../containers/header';
import DetailedItem from '../../components/detailed-item';

function Book() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    id && dispatch(loadBook(id));
  }, [dispatch, id]);
  
  const select = useSelector((state: RootState) => ({
    thumbnailImg: state.books.currentBook?.volumeInfo.imageLinks?.thumbnail,
    smallImg: state.books.currentBook?.volumeInfo.imageLinks?.small,
    title: state.books.currentBook?.volumeInfo.title,
    categories: state.books.currentBook?.volumeInfo.categories,
    authors: state.books.currentBook?.volumeInfo.authors,
    description: state.books.currentBook?.volumeInfo.description,
    loading: state.books.loading
  }), shallowEqual);

  return (
    <>
      <Header/>
      {select.loading ?
      <div className='d-flex justify-content-center my-5'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Загрузка...</span>
        </div>
      </div> :
      <DetailedItem 
        img={select.smallImg ? select.smallImg : select.thumbnailImg}
        title={select.title}
        categories={select.categories}
        authors={select.authors}
        description={select.description}
      />}
    </>
  )
}

export default Book;