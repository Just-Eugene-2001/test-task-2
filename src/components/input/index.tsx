import { useCallback, useState } from 'react';

interface InputProps {
  inputSearch: (input: string) => void;
}

function Input({ inputSearch }: InputProps) {
  const [input, setInput] = useState('');

  const callbacks = {
    inputSubmit: useCallback(() => inputSearch(input), [inputSearch, input]),
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter') callbacks.inputSubmit();
  }

  return (
    <div className='row justify-content-center p-3'>
      <div className='col-6'>
        <input
          type='text'
          className='form-control'
          id='floatingInput'
          placeholder='Название книги'
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete='on'
        />
      </div>
      <div className='col-auto'>
        <button type='submit' className='btn btn-secondary' onClick={callbacks.inputSubmit}>Поиск книги</button>
      </div>
    </div>
  )
}

export default Input;
