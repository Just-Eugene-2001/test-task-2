import { useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/hook';
import { loadBooks, changeStartIndex } from '../../redux/booksSlice';

import Header from '../../containers/header';
import List from '../../components/list';
import Item from '../../components/item';

function Main() {
  const dispatch = useAppDispatch();

  const select = useSelector((state: RootState) => ({
    totalItems: state.books.books.totalItems,
    books: state.books.books.items,
    showLoadMore: state.books.showLoadMore,
    loading: state.books.loading,
  }), shallowEqual);

  const callbacks = {
    loadMore: useCallback(() => {
      dispatch(changeStartIndex());
      dispatch(loadBooks());
    }, [dispatch])
  }

  interface ItemProps {
    id: string;
    volumeInfo: {
      imageLinks: {
        thumbnail: string;
      };
      title: string;
      categories: string[];
      authors: string[];
    };
  }

  function renderItem(item: ItemProps) {
    return (
      <Item
        img={item.volumeInfo.imageLinks?.thumbnail}
        title={item.volumeInfo.title}
        categories={item.volumeInfo.categories}
        authors={item.volumeInfo.authors}
        link={`/book/${item.id}`}
      />
    )
  }

  return (
    <div className=''>
      <Header/>
      <List
        totalItems={select.totalItems}
        items={select.books}
        renderItem={renderItem}
        loadMore={callbacks.loadMore}
        showLoadMore={select.showLoadMore}
        loading={select.loading}
      />
    </div>
  );
}

export default Main;