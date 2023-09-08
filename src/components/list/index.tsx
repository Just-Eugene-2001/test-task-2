import { useCallback } from 'react';

interface ListProps<T> {
  totalItems: number;
  items: T[];
  renderItem: (item: T) => JSX.Element;
  loadMore: () => void;
  showLoadMore: boolean;
  loading: boolean;
}

function List<T extends { id: string }>({
  totalItems,
  items,
  renderItem,
  loadMore,
  showLoadMore,
  loading
}: ListProps<T>) {
  const callbacks = {
    loadMore: useCallback(() => loadMore(), [loadMore]),
  }

  return (
    <div className='container-sm'>
      <div className='text-center h4'>Found {totalItems} results</div>
      {items && 
      <div className='my-3 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4'>{items.map((item, index) =>
        <div className='col' key={index}>
          {renderItem(item)}
        </div>)}
      </div>}
      {loading && <div className='d-flex justify-content-center my-5'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Загрузка...</span>
        </div>
      </div>}
      {(showLoadMore && !loading) &&
      <div className='d-grid col-6 mx-auto my-4'>
        <button type='button' className='btn btn-secondary' onClick={callbacks.loadMore}>Load more</button>
      </div>}
    </div>
  )
}

export default List;
