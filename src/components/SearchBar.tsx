import {useState} from 'react'
import SearchResults from './SearchResults'

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedQuery(searchQuery)
  }

  return (
    <>
      <h2>Search for a user:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Github username:
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <input type="submit" value="Search" />
      </form>
    <SearchResults submittedQuery={submittedQuery} />
    </>
  );
}

export default SearchBar;