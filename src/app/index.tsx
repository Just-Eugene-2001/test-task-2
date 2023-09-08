import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Main from './main';
import Book from './book';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/book/:id'} element={<Book/>}/>
        <Route path={'*'} element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
