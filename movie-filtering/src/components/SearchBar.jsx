import { useState } from 'react';

const SearchBar = ({ search, setSearch, maxLength, setMaxLength, movies, setMovies }) => {
  const [sortingOrder, setSortingOrder] = useState('asc');

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const maxLengthHandler = (e) => {
    setMaxLength(e.target.value);
  };

  const sortMovies = () => {
    const sortedMovies = [...movies];
    if (sortingOrder === 'asc') {
      sortedMovies.sort((a, b) => a.length - b.length);
      setSortingOrder('desc');
    } else {
      sortedMovies.sort((a, b) => b.length - a.length);
      setSortingOrder('asc');
    }
    setMovies(sortedMovies);
  };

  return (
    <>
      <label htmlFor='search'>Search Query</label>
      <input type='text' name='search' onChange={searchHandler} value={search} />
      <label htmlFor='max-length'>Max Length</label>
      <input type='number' name='max-length' onChange={maxLengthHandler} value={maxLength} />
     
      
      <button onClick={sortMovies}
      > <a href="#_" class="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
      <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
      <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
      <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
      <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
      <span class="relative">Sort Movies</span>
      </a>
         ({sortingOrder === 'asc' ? 'Ascending Order' : 'Descending Order'})
     
</button>
    </>
  );
};

export default SearchBar;
