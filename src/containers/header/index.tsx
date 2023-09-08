import { useCallback, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/hook';
import { changeCategory, changeSortingBy, loadBooks, setSearch } from '../../redux/booksSlice';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/input';
import Select from '../../components/select';

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const select = useSelector((state: RootState) => ({
    categoriesOptions: state.books.options.categories,
    category: state.books.searchParams.category,
    sortingByOptions: state.books.options.sortingBy,
    sortingBy: state.books.searchParams.sortingBy,
    error: state.books.error
  }), shallowEqual);

  const [category, setCategory] = useState(select.category);
  const [sortBy, setSortBy] = useState(select.sortingBy);

  const callbacks = {
    inputSearch: useCallback((name: string) => {
      navigate('/');
      dispatch(setSearch(name));
      dispatch(changeCategory(category));
      dispatch(changeSortingBy(sortBy));
      dispatch(loadBooks());
    }, [dispatch, category, sortBy, navigate]),
  }

  return (
    <header className='container-sm'>
      <Input inputSearch={callbacks.inputSearch}/>
      <div className='row gap-3 p-3'>
        <Select 
          selectName={'Categories'}
          options={select.categoriesOptions}
          changeSelect={setCategory}
          selected={select.category}
        />
        <Select
          selectName={'Sorting by'}
          options={select.sortingByOptions}
          changeSelect={setSortBy}
          selected={select.sortingBy}
        />
      </div>
      {select.error && <div className='text-center p-3 fs-1'>{select.error}</div>}
    </header>
  );
}

export default Header;