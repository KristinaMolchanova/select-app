import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import SearchInput from './components/SearchInput/SearchInput';
import Option from './components/Option/Option';
import { fetchOptions } from './utils/fetchOptions';
import { OptionType } from './utils/fetchOptions';
import './styles/App.scss';

const App: React.FC = () => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<OptionType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOptions().then(setOptions);
  }, []);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.text.toLowerCase().includes(selectedOption.toLowerCase())
      )
    );
  }, [selectedOption, options]);

  const handleOptionClick = (option: OptionType) => {
    setIsOpen(false);
    setSelectedOption(option.text);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style}>
      <Option
        key={filteredOptions[index].id}
        option={filteredOptions[index]}
        onClick={() => handleOptionClick(filteredOptions[index])}
      />
    </div>
  );

  return (
    <div className="select" ref={selectRef}>
      <div className="select__title">
        {selectedOption ? selectedOption : 'Select an option'}
      </div>
      <div className="select__input" onClick={() => setIsOpen(!isOpen)}>
        <SearchInput value={selectedOption} onChange={setSelectedOption} />
        <div className="select__input-buttons">
        {selectedOption && (
          <button className="clear" onClick={() => setSelectedOption('')}>
            <img src='/close.svg' />
          </button>
        )}
          <button className="open" onClick={() => setIsOpen(!isOpen)}>
          <img src='/arrow-down.svg' />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="select__dropdown">
          <List
            height={200}
            itemCount={filteredOptions.length}
            itemSize={40}
            width="100%"
          >
            {Row}
          </List>
        </div>
      )}
    </div>
  );
};

export default App;

