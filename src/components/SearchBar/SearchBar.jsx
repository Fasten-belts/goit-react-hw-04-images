import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  Searchbar,
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './SearchBar.styled';
import toast from 'react-hot-toast';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleValueChange = evt => {
    this.setState({ value: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { value } = this.state;
    if (value.trim() === '') {
      return toast.error('Please wright your request', {
        icon: '👈',
      });
    }
    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    const onChange = this.handleValueChange;
    const onSubmit = this.handleSubmit;

    return (
      <Searchbar className="searchbar">
        <SearchForm className="form" onSubmit={onSubmit}>
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
            onChange={onChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
