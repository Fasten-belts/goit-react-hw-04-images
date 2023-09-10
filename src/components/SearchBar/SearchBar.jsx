import React, { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  Searchbar,
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './SearchBar.styled';
import toast from 'react-hot-toast';

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  function handleValueChange(evt) {
    setValue(evt.currentTarget.value.toLowerCase());
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (value.trim() === '') {
      return toast.error('Please wright your request', {
        icon: '👈',
      });
    }
    onSubmit(value);
    setValue('');
  }

  return (
    <Searchbar className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchButton type="submit" className="button">
          <SearchSpan className="button-label">
            <FcSearch size="30" />
          </SearchSpan>
        </SearchButton>
        <SearchInput
          className="input"
          type="text"
          name="query"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleValueChange}
        />
      </SearchForm>
    </Searchbar>
  );
}

export { SearchBar };
