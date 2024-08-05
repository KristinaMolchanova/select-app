import React from 'react';
import './SearchInput.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      id="select"
      className='search-input'
      value={value}
      placeholder="Search..."
      autoComplete="off"
      aria-label="Search"
      aria-describedby="search-assist"      
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};

export default SearchInput;
