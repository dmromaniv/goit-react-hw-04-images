import { useState, memo } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './Searchbar.module.css';

export const Searchbar = memo(({ addSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery) {
      addSearchQuery(searchQuery);
      setSearchQuery('');
    } else {
      Notify.info('Please enter any search query');
    }
  };

  const handleChange = event => {
    const searchQuery = event.target.value.trim();
    if (searchQuery.length > 0) {
      setSearchQuery(searchQuery);
    }
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.searchFormButton}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
});
