import { useState } from 'react';

interface SelectProps {
  selectName: string;
  options: string[];
  changeSelect: (value: string) => void;
  selected?: string;
}

function Select({ selectName, options, selected, changeSelect }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState(selected ? selected : options[0]);

  function handleChange(value: string) {
    setSelectedOption(value);
    changeSelect(value);
  }

  return (
    <div className='col-sm row align-items-center'>
      <div className='col-auto'>{selectName}</div>
      <select 
        className='form-select col'
        value={selectedOption}
        onChange={e => handleChange(e.target.value)}
      >
        {options.map((option) =>
          <option key={option} value={option}>{option}</option>
        )}
      </select>
    </div>
  )
}

export default Select;
