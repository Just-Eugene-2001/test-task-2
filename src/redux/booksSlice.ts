import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// type CategoriesFilter = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry';
// type SortFilter = 'relevance' | 'newest';

type Book = {
  id: string;
  volumeInfo: {
    imageLinks: {
      thumbnail: string;
      small: string;
    };
    title: string;
    categories: string[];
    authors: string[];
    description: string;
  };
}

type Books = {
  totalItems: number;
  items: Book[];
}

export const loadBooks = createAsyncThunk<Books, undefined, { state: RootState }>(
  'books/loadBooks',
  async (_, { getState, rejectWithValue }) => {
    const key = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?`;
    const state = getState();
    const params = state.books.searchParams;
    const response = await fetch(`${url}q=${params.search}${params.category !== 'all' && `+subject:${params.category}`}&orderBy=${params.sortingBy}&maxResults=${params.maxResults}&startIndex=${params.startIndex}&key=${key}`);
    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await response.json();
    return data;
  }
)

export const loadBook = createAsyncThunk<Book, string, { state: RootState }>(
  'books/loadBook',
  async (id, { rejectWithValue }) => {
    const url = `https://www.googleapis.com/books/v1/volumes/`;
    const response = await fetch(`${url}${id}`);
    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await response.json();
    return data;
  }
)

type BooksState = {
  books: Books;
  currentBook?: Book;
  options: {
    categories: string[]; 
    sortingBy: string[];
  }
  searchParams: {
    search: string;
    category: string;
    sortingBy: string;
    startIndex: number;
    maxResults: number;
  }
  showLoadMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: {
    totalItems: 0,
    items: []
  },
  options: {
    categories: ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'],
    sortingBy: ['relevance', 'newest']
  },
  searchParams: {
    search: '',
    category: 'all',
    sortingBy: 'relevance',
    startIndex: 0,
    maxResults: 30,
  },
  showLoadMore: false,
  loading: false,
  error: null,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changeCategory(state, action: PayloadAction<string>) {
      state.searchParams.category = action.payload;
    },
    changeSortingBy(state, action: PayloadAction<string>) {
      state.searchParams.sortingBy = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.searchParams.search = action.payload;
      state.searchParams.startIndex = 0;
      state.books = initialState.books;
      state.showLoadMore = initialState.showLoadMore;
    },
    changeStartIndex(state) {
      state.searchParams.startIndex += state.searchParams.maxResults;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.searchParams.startIndex === 0 ?
        state.books = action.payload :
        state.books.items = [...state.books.items, ...action.payload?.items];
        state.books.totalItems > state.searchParams.startIndex + 1 * state.searchParams.maxResults ?
        state.showLoadMore = true :
        state.showLoadMore = false;
      })
      .addCase(loadBooks.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loadBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBook.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(loadBook.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
        state.loading = false;
      })
  }
});

export const { changeCategory, changeSortingBy, setSearch, changeStartIndex } = booksSlice.actions;
export default booksSlice.reducer;
